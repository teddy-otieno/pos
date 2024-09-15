import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/surreal';

export const load: PageServerLoad = async ({ cookies }) => {};
