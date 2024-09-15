import { Surreal } from 'surrealdb.js';

let _db: Surreal | undefined;

export async function init_db() {
	if (_db) return _db;
	console.log('Connection...');
	_db = new Surreal();

	console.log(_db);
	try {
		await _db.connect('ws://0.0.0.0:8000/rpc', {
			auth: {
				username: 'root',
				password: 'root'
			}
		});

		await _db.use({ namespace: 'ecommerce', database: 'ecommerce' });

		return _db;
	} catch (err) {
		console.error('Failed to connect');
		throw err;
	}
}

export async function closeDb() {
	if (!_db) return;
	await _db.close();
	_db = undefined;
}

export const db = await init_db();

export function getDb() {
	if (_db == undefined) {
		throw new Error('DB not initialized');
	}

	return _db;
}
