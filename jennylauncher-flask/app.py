from flask import Flask, render_template

app = Flask(__name__)

DOWNLOAD_URL = "https://github.com/user-attachments/files/26860575/Form1.zip"

@app.route("/")
def home():
    return render_template("index.html", download_url=DOWNLOAD_URL)

if __name__ == "__main__":
    app.run(debug=True)
