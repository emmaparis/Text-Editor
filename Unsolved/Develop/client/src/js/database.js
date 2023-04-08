import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');
console.log("Post to database");
	
	const jateDb = await openDB("jate", 1);
	
	const tx = jateDb.transaction("jate", "readwrite");
	
	const store = tx.objectStore("jate");
	
	const request = store.put({ id: 1, value: content });
	
	try {
		const result = await request;
		console.log("saved to database", result);
	} catch (err) {
		console.error("putDb not implemented", err);
		throw new Error("Failed to save");
	};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
	console.log("GET all from the database");
	const jateDb = await openDB("jate", 1);
	const tx = jateDb.transaction("jate", "readonly");
	const store = tx.objectStore("jate");
	const request = store.get(1);
	try {
		const result = await request;
		console.log("result", result);
		return result?.value;
	} catch (err) {
		console.error("getDb not implemented", err);
		throw new Error("Failed to get content from the database");
	}
};


initdb();
