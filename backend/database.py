import sqlite3
con = sqlite3.connect('Stocks.db')
cur = con.cursor()
M=cur.execute("SELECT * FROM UserStocks")
print(M.fetchall())

cur.execute('DELETE FROM UserStocks where user_id=? and Stock= ?',('1','GOOG'))
con.commit()
con.close()