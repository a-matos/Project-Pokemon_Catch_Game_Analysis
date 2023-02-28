from flask import Flask, render_template, request, redirect, url_for
from configparser import ConfigParser
import psycopg2
  
#config reading file and extracting the parameters  
def config(filename='config/database.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)
  
    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))
  
    return db

def get_db_connection():
    """ Connect to the PostgreSQL database server """
    # read connection parameters
    params = config()
  
    # connect to the PostgreSQL server
    conn = psycopg2.connect(**params)
          
    # create a cursor
    cur = conn.cursor()
    return (conn,cur)         
 
def execute_queries(cquery):
    conn,cur = get_db_connection()
    cur.execute('select distinct "Names" from pokemon_names  order by "Names";')
    pnames = cur.fetchall()
    cur.execute("select distinct weather from pk_catch order by weather;")
    wnames = cur.fetchall()

    cur.execute(cquery)
    posts = [dict(city=row[0], lat=row[1],lng=row[2], count=row[3]) for row in cur.fetchall()]

    cur.execute("select a.weather, b.\"Names\", a.cnt from (select distinct on (weather) weather,\"pokemonId\", count(*) cnt from pk_catch  group by weather, \"pokemonId\" order by 1,3 desc)a, pokemon_names b where a.\"pokemonId\" = b.\"Id\" order by 3 desc;")
    stats = [dict(weather=row[0], pokemon=row[1], count=row[2]) for row in cur.fetchall()]

    cur.close()
    conn.close()

    pokenames=["All"]
    for pn in pnames:
        pokenames.append(pn[0])

    weathers=["All"]
    for weather in wnames:
        weathers.append(weather[0])
    
    return (pokenames, weathers,posts,stats)

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():

    cquery = "select city,  avg(latitude) lat, avg(longitude) lng, count(*)  pc from pk_catch group by city order by pc desc;"
    pokenames,weathers,posts,stats = execute_queries(cquery) 

    pchosen = 'All'
    wchosen = 'All'

    return render_template('index.html', pokenames=pokenames,weathers=weathers,posts=posts,pchosen=pchosen,wchosen=wchosen,stats=stats)

@app.route('/results.html', methods=['GET','POST'])
def results():
    
    pchosen = request.form['pokenames']
    wchosen = request.form['weathers']
    
    if pchosen == 'All':
        if wchosen == 'All':
            cquery = "select city,  avg(latitude) lat, avg(longitude) lng, count(*)  pc from pk_catch group by city order by pc desc;"
        else:
            cquery = "select city,  avg(latitude) lat, avg(longitude) lng, count(*)  pc from pk_catch where weather = '{}' group by city order by pc desc;".format(wchosen)
    else:
        if wchosen == 'All':
            cquery = "select city,  avg(latitude) lat, avg(longitude) lng, count(*)  pc from pk_catch a, pokemon_names b  where b.\"Names\" = '{}' and b.\"Id\" = a.\"pokemonId\" group by city order by pc desc;".format(pchosen)
        else:
            cquery = "select city,  avg(latitude) lat, avg(longitude) lng, count(*)  pc from pk_catch a, pokemon_names b  where b.\"Names\" = '{}' and b.\"Id\" = a.\"pokemonId\" and a.weather = '{}' group by city order by pc desc;".format(pchosen,wchosen)
       
    pokenames,weathers,posts,stats = execute_queries(cquery)

    return render_template('index.html', pokenames=pokenames,weathers=weathers,posts=posts,pchosen=pchosen,wchosen=wchosen,stats=stats)

if __name__ == "__main__":
    app.run()