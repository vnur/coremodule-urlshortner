const http = require("http");
const port = process.env.PORT;
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto")

const htmlfile = path.join(__dirname, "view", "index.html");
const cssfile = path.join(__dirname, "view", "style.css");
const datafile = path.join(__dirname, "data", "data.json")


const loadfile = async () => {
  try {
    const readdata = await fs.readFile(datafile, "utf-8")
    return JSON.parse(readdata)
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(datafile, JSON.stringify({}))
      return {}
    }
    throw error
  }
}


const saveData = async (loaddata) => {
  return await fs.writeFile(datafile, JSON.stringify(loaddata))
}

const server = http.createServer(async (req, res) => {
  if (req.method == "GET") {
    if (req.url == "/") {
      const readfile = await fs.readFile(htmlfile, "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(readfile);
    }

    if (req.url == "/style.css") {
      const readfile = await fs.readFile(cssfile, "utf-8");
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(readfile);
    }

    else if (req.url == "/links") {
      const loaddata = await loadfile()
      res.writeHead(200, { "Content-Type": "application/json" })
      res.end(JSON.stringify(loaddata))
    }
    
    else {
      try {
        const data = await loadfile()
        const shortcode = req.url.slice("1")
        console.log(data[shortcode]);

        res.writeHead(302, { location: data[shortcode] })
        return res.end()
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/text" })
        res.end("url is not defined ")
      }
    }
  }




  

else if (req.method == "POST") {
  if (req.url == "/") {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });


    req.on("end", async () => {

      const loaddata = await loadfile()



      const { url, shortcode } = JSON.parse(data)

      if (!url) { 
        res.writeHead(400, { "Content-Type": "application/text" })
        return res.end("please enter the url")
      }


      const finalshortcode = shortcode || crypto.randomBytes(4).toString("hex")


      if (loaddata[finalshortcode]) {
        res.writeHead(400, { "Content-Type": "application/text" })
        return res.end("url is already exists please choose another")
      }

      loaddata[finalshortcode] = url

      await saveData(loaddata)

      res.writeHead(200, { "Content-Type": "application/json" })
      return res.end(JSON.stringify({ sucess: true, shortcode: finalshortcode }))



    })
  }


  }
})


server.listen(port, () => {
  console.log(`server is listenig at port ${port}`);
});
