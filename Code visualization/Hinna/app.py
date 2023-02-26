from flask import Flask, render_template
from configparser import ConfigParser
import psycopg2
  
  
def config(filename='database.ini', section='postgresql'):
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
 
app = Flask(__name__)

@app.route('/')
def index():
    conn,cur = get_db_connection()
    cur.execute('SELECT * FROM pokemon_hp;')
    pokes = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('index.html', pokes=pokes)

if __name__ == "__main__":
    app.run()