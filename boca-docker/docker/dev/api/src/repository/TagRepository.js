const pool = require('../database/db_connection')


class TagRepository {
    constructor() { }


	async createTag(id_c, entityTag) {
		try {
			const client = await pool.connect();

			/* need to return id of tag to make the relationship with tagintermediate and the respective entity, problem or user */
			const response = await client.query(`INSERT INTO tagtable (contestnumber, name, value) VALUES (${id_c},'${entityTag.tag.name}','${entityTag.tag.value}') RETURNING id`)  
			const id_t = response.rows[0].id

      		const id_entity = entityTag.entityId

      		/* Creating the relationship between tag and tagintermediate and the respective entity, problem or user              */
			if(entityTag.entityType == 'problem'){
				this.createTagIntermediateProblem(id_c, id_t, id_entity)  /*In this case, id_entity is the id of the problem     */
			
			}else if (entityTag.entityType == 'site/user'){
         		this.createTagIntermediateUser(id_c, id_t, id_entity)  /* In this case, id_entity is the id of site/user         */
			}
			client.release();
			return id_t 

      	}catch (error) {
		  	throw new Error('Error creating tag on repository: ' + error.message);
		}
	}


	async createTagIntermediateProblem(id_c, id_t, id_problem) {
		try {
			const client = await pool.connect();
			const result = await client.query(`INSERT INTO tagintermediatetable (contestnumber, idtag_entity, idproblem_entity) VALUES (${id_c}, ${id_t}, ${id_problem}) RETURNING id`);
			client.release();
	
			return result.rows;
			
		} catch (error) {
			throw new Error('Error creating tag intermediatetable for problem on repository: ' + error.message);
		}
	}



	/* id_usersite comes as "site/user"	    */
	async createTagIntermediateUser(id_c, id_t , id_usersite) {
		try {
			const client = await pool.connect();
		
			const id_site = id_usersite.split('/')[0]
			const id_user = id_usersite.split('/')[1]
		
			const result = await client.query(`INSERT INTO tagintermediatetable (contestnumber, idtag_entity, iduser_entity, idusersite) VALUES (${id_c},'${id_t}', '${id_user}', '${id_site}') RETURNING id`) /* return id of tagintermediate */
			client.release();
	
			return result.rows;
			
		} catch (error) {
			throw new Error('Error creating tag intermediatetable for user on repository: ' + error.message);
		}
	}

	/* This method only allows the update of tag's name or value. It does not allow changing which entity the tag is associated */
	async updateTag(id_c, id_t, tag_name, tag_value) {
		try {
			const client = await pool.connect();

			if (tag_name && tag_value) {
				await client.query(`UPDATE tagtable SET name = '${tag_name}', value = '${tag_value}' WHERE contestnumber = '${id_c}' AND id = '${id_t}'`);
			} else if (tag_name) {
				await client.query(`UPDATE tagtable SET name = '${tag_name}' WHERE contestnumber = '${id_c}' AND id = '${id_t}'`);
			} else if (tag_value) {
				await client.query(`UPDATE tagtable SET value = '${tag_value}' WHERE contestnumber = '${id_c}' AND id = '${id_t}'`);
			}

			client.release();
		  
  
		} catch (error) {
		  throw new Error('Error updating tag: ' + error.message);
		}
	  }
	

	async readTag(id_c, id_t) {
		try {
			const client = await pool.connect();
			const result = await client.query(`SELECT id, name, value, contestnumber FROM tagtable WHERE contestnumber = ${id_c} AND id = ${id_t}`) 
			client.release();
			
			return result.rows
			
		} catch (error) {
			throw new Error('Error reading tag on repository: ' + error.message);
		}
    }


    async readAllTags(id_c) {
		try {
			const client = await pool.connect();
			const result = await client.query(`SELECT * FROM tagtable WHERE contestnumber = ${id_c}`) 
			client.release();

			return result.rows;
			
		} catch (error) {
			throw new Error('Error reading all tags on repository: ' + error.message);
		}
    }



    async deleteTag(id_c, id_t) {
		try {
			const client = await pool.connect();

			/* Deleting on tagtable    */
			await client.query(`DELETE FROM tagtable WHERE contestnumber = ${id_c} AND id = ${id_t}`) 
		
			/* Deleting on tagintermediatetable --> ON CASCADE makes this automatically  */
			client.release();

		} catch (error) {
			throw new Error('Error deleting tag on repository: ' + error.message);
		}
    }


  


}



module.exports = TagRepository;

