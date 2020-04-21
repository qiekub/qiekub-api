const { compileAnswers, upsertOne } = require('../../modules.js')

module.exports = async (parent, args, context, info) => {
	const mongodb = context.mongodb
	
	return new Promise((resolve,reject)=>{
		if (!args._id) {
			reject('No _id value')
		}else if (!mongodb.ObjectID.isValid(args._id)) {
			reject('_id is not a correct ObjectID')
		}else{
			
			console.log('args._id', args._id)

			const docID = new mongodb.ObjectID(args._id)

			compileAnswers(mongodb, docID, (error,docs)=>{
				

				if (error) {
					reject(error)
				}else{
					let doc = {}
					if (!!docs && docs.length > 0) {
						doc = docs[0]
					}
					
				console.log('doc', JSON.stringify(doc, null,4))

					upsertOne(mongodb.CompiledPlaces_collection, doc, (docID)=>{

						console.log('docID', docID)

						if (!!docID) {
							resolve(true)
						}else{
							resolve(false)
						}
					})
				}
			})
		}
	})
}