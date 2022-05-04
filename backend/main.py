from crypt import methods
from doctest import REPORT_CDIFF
import json
import sqlite3
from urllib.parse import uses_relative
import requests
import random
from urllib import response
from flask_cors import CORS
from nsepy import get_history
from datetime import date
from flask import Flask, jsonify,make_response,render_template,request, url_for,redirect
from nsetools import Nse



con = sqlite3.connect('users.db')
print("Users Database connected")
cur = con.cursor()
con.execute('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,age INTEGER)')
con.commit()
con.close()


con = sqlite3.connect('Stocks.db')
print("Stocks Database connected")
cur = con.cursor()
con.execute('CREATE TABLE IF NOT EXISTS Stocks(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,symbol TEXT)')
# cur.execute('INSERT INTO Stocks values(NULL,?,?)',("Apple Inc.","AAPL"))
# cur.execute('INSERT INTO Stocks values(NULL,?,?)',("American Assests Trust Inc","AAT"))
# cur.execute('INSERT INTO Stocks values(NULL,?,?)',("Tata Consultancy Services Limited","TCS"))
# cur.execute('INSERT INTO Stocks values(NULL,?,?)',("Microsoft Corporation","MSFT"))
# cur.execute('INSERT INTO Stocks values(NULL,?,?)',("Alphabet Inc","GOOG"))
# cur.execute('INSERT INTO Stocks values(NULL,?,?)',("KECK SENG Ltd.","KEC"))
# cur.execute('INSERT INTO Stocks values(NULL,?,?)',("RELIANCE WORLDWIDE ","0EU"))
# cur.execute('INSERT INTO Stocks values(NULL,?,?)',("Sea TV Network Ltd","SEATV"))
# cur.execute('INSERT INTO Stocks values(NULL,?,?)',("Champion Gaming Group Inc.","WAGR"))
# cur.execute('INSERT INTO Stocks values(NULL,?,?)',("WALMART INC.","WALMART"))
# cur.execute('INSERT INTO Stocks values(NULL,?,?)',("NIKE","NIKE34"))
# cur.execute('DELETE FROM Stocks where id >= 6')
con.commit()
con.close()

app=Flask(__name__)
CORS(app)

keys = ["bb2f3419c51249999343ac278e5c60e6",
"b8dd585863da45b08eb42e7ce11b2830",
"f189adb0ebd74874b4ca81e9a551c208",
"357ecb547411476e896a8980a3f22e7b",
"43f6eef0fb2e485485919c2609cf73bd",
"0daaf6326f784c05b8280d5da7c099a4",
"88e143bda89b4424aef8a3ad4dd67abf"]



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/user/new/', methods = ['POST'])
def addUser() :
    if request.method == 'POST':
        req = request.json
        name_data = req["name"]
        age_data = req["age"]

        con= sqlite3.connect('users.db')
        cur = con.cursor()
        cur.execute('INSERT INTO users values(NULL,?,?)',(name_data,age_data))
        con.commit()
        msg = "Data added successfully"
        con.close()

        response =  jsonify( {"message" : msg} )
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response  

@app.route('/user/delete', methods = ['POST'])
def deleteUser() :
    if request.method == 'POST':
        req = request.json
        id = req["id"]

        con= sqlite3.connect('users.db')
        cur = con.cursor()
        cur.execute('DELETE FROM users where id = ?',(id,))
        con.commit()
        con.close()
        msg = "User Deleted"
        response =  jsonify( {"message" : msg} )
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response  

@app.route('/stock/all/',methods = ['GET'])
def showAllStocks():
    if request.method == 'GET':
        nse=Nse()
        m=nse.get_index_list()
        data={}
        data["NIFTY 50"]=nse.get_index_quote("NIFTY 50")

        data["NIFTY MIDCAP 100"]=nse.get_index_quote("NIFTY MIDCAP 100")

        data["NIFTY BANK"]=nse.get_index_quote("NIFTY BANK")

        data["NIFTY MIDCAP 50"]=nse.get_index_quote("NIFTY MIDCAP 50")

        data["NIFTY METAL"]=nse.get_index_quote("NIFTY METAL")

        data["NIFTY 50"]=nse.get_index_quote("NIFTY 50")

        data["NIFTY IT"]=nse.get_index_quote("NIFTY IT")
        return data

@app.route('/stock', methods = ['POST'])
def stockDetails() :
    nse=Nse()
    req = request.json
    name = req["symbol"]
    return nse.get_quote(name)


@app.route('/addstock', methods = ['POST'])
def addStock() :
    if request.method == 'POST':
        req = request.json
        id = req["id"]
        symbol = req["symbol"]
        con = sqlite3.connect('Stocks.db')
        cur = con.cursor()
        cur.execute('INSERT INTO UserStocks values(NULL,?,?)',(id,symbol))
        con.commit()
        con.close()
    return {"message" : "added stock successfully"}

@app.route('/getuserstocks', methods = ['POST'])
def getUserStocks() :
    if request.method == 'POST':
        req = request.json
        id = req["id"]
        con = sqlite3.connect('Stocks.db')
        cur = con.cursor()
        cur.execute('Select Stock from UserStocks where user_id= ?',(id,))
        userStocks = cur.fetchall()
        data = {}
        nse=Nse()
        for userStock in userStocks:
            temp=nse.get_quote(userStock[0])
            
            data[userStock[0]] ={'price':temp['averagePrice'],"name":temp["companyName"]}
            
        con.commit()
        con.close()
    print(data)
    return data

@app.route('/users', methods = ['GET'])
def getUsers() :
    con = sqlite3.connect('users.db')
    cur = con.cursor()
    cur.execute('SELECT * FROM users')
    rows = cur.fetchall()
    data = {}
    list = []
    for row in rows:
        print(row[1])    
        instance = {  "id" : row[0] , "name" : row[1] ,"age" : row[2]} 
        list.append(instance)
    data["users"] = list
    return data

@app.route('/deleteuserstocks', methods = ['POST'])
def deleteUserStocks() :
    if request.method == 'POST':
        req = request.json
        id = req["id"]
        symbol = req["symbol"]
        con = sqlite3.connect('Stocks.db')
        cur = con.cursor()
        cur.execute('DELETE FROM UserStocks where user_id=? and Stock=?',(id,symbol))
        con.commit()
        con.close()
    return {"message" : "stock deleted successfully"}

@app.route('/gettimedata', methods = ['POST'])
def getTimeData() :
    from datetime import date,timedelta,datetime
    
    if request.method == 'POST' :
        req = request.json
        stock = req["symbol"]
        date1=date.today()
        date2=datetime.now() - timedelta(120)

        
        t=(get_history(symbol=stock, start=date(date2.year,date2.month,date2.day),
         end=date(date1.year,date1.month,date1.day)))
        open_price = list(t['Open'])
        close_price = list(t['Close'])
        high=list(t['High'])
        low=list(t['Low'])
        datee=list(t.index)
        for i in range(len(datee)):
            datee[i]=str(datee[i].day)+"-"+str(datee[i].month) +"-"+str(datee[i].year)
        

        
        response = {"open" : open_price , "close" : close_price  ,"high":high  , "low" : low  , "date":datee }
    return response
@app.route('/stocksym',methods=['GET'])
def stocksym() :
    nse=Nse()
    return nse.get_stock_codes()

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')