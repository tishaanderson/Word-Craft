import { openDB } from 'idb';

const initdb = async () =>
  openDB('social', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('social database already exists');
        return;
      }
      db.createObjectStore('social', { keyPath: 'id', autoIncrement: true });
      console.log('social database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const socialDb = await openDB('social', 1);
  const tx = socialDb.transaction('social', 'readwrite');
  const store = tx.objectStore('social');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('result.value', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const socialDb = await openDB('social', 1);
  const tx = socialDb.transaction('social', 'readonly');
  const store = tx.objectStore('social');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();

//result.value???