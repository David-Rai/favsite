const db = require("../models/db.js")

//sending all the sites
const getAll = async (req, res) => {
    const query="select * from sites"
    const [rows] = await db.execute(query)

    if(!rows.length > 0){
        res.status(500).json({message:"no rows available"})
    }

    res.json(rows)

}

//adding the new site
const addSite=async (req,res)=>{
    const newSite=req.body
    const siteImage=`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${newSite.site_path}&size=34`
    const query="insert into sites (site_path,img_path) values(?,?)"
    const results=await db.execute(query,[newSite.site_path,siteImage])

    res.json(results)
}

//deleting the site on basis of the id
const deleteSite=async (req,res)=>{
const id=parseInt(req.params.id)
const query = `
  DELETE FROM sites WHERE id = ?;
`;

const results=await db.execute(query,[id])
await db.execute("alter table sites auto_increment=1")

res.json(results)
}

//update data on basis of their id
const updateSite=async (req,res)=>{
const {id,site_path}=req.body
const query="update sites set site_path=? where id=?"

const results=await db.execute(query,[site_path,id])

res.send({id,site_path,results})

}

module.exports = {
    getAll,addSite,deleteSite,updateSite
}