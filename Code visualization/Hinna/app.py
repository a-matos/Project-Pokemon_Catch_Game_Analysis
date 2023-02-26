from flask import Flask, render_template
from configparser import ConfigParser
import psycopg2
import json
from flask import jsonify
import json
import decimal

class Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal): return float(obj)
  
def config(filename='C:/Users/16476/OneDrive/Documents/pokemongithubproj/database.ini', section='postgressql'):
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
    cur.execute('SELECT * FROM pokemon limit 100;') # to remove limit
    pokes = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('index.html', pokes=pokes)

@app.route('/getRecord', methods=['GET'])
def query_records():
    conn,cur = get_db_connection()
    cur.execute('SELECT * FROM pokemon;')
    pokes = cur.fetchall()
    cur.close()
    conn.close()
    return {"data":json.dumps( pokes , cls = Encoder)}

# used flask to make api endpoint called getrecord which baciscally get all the records so we can use the data to extract useful information

if __name__ == "__main__":
    app.run()