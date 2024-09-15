import { building } from '$app/environment';
import { init_db } from '$lib/surreal';

if (!building) {
	init_db();
}
