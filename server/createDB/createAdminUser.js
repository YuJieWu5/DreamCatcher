db = db.getSiblingDB('admin')
db.createUser(
{
	user: "dbAdmin", 
	pwd: "test",
	roles: [ "readWriteAnyDatabase", "dbAdminAnyDatabase", "clusterAdmin"]	
}
)

console.log(db.getUsers());