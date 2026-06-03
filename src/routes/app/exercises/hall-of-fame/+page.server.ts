import { db } from '$lib/server/';
import { recordTable, userTable, exerciseTable } from '$lib/server/database/schema';
import { eq, sql, asc, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.safeGetSession();
    const currentUserId = session?.user?.id;

    const bestPerUser = db
        .select({
            userId: recordTable.userId,
            exerciseId: recordTable.exerciseId,
            maxWeight: sql<number>`MAX(${recordTable.liftedWeight})`.as('max_weight'),
        })
        .from(recordTable)
        .groupBy(recordTable.userId, recordTable.exerciseId)
        .as('best_per_user');

    const allRecords = await db
        .select({
            userId: userTable.id,
            userName: userTable.firstName,
            userLastName: userTable.lastName,
            userGender: userTable.gender,
            userAge: userTable.dateOfBirth,
            userWeight: userTable.weight,
            exerciseName: exerciseTable.name,
            weight: bestPerUser.maxWeight,
            rank: sql<number>`row_number() over (
                partition by ${bestPerUser.exerciseId} 
                order by ${bestPerUser.maxWeight} desc
            )`.as('rank'),
        })
        .from(bestPerUser)
        .leftJoin(userTable, eq(bestPerUser.userId, userTable.id))
        .leftJoin(exerciseTable, eq(bestPerUser.exerciseId, exerciseTable.id))
        .orderBy(
            desc(bestPerUser.maxWeight),
            asc(sql`rank`),
        );


    return {
        allRecords,
        currentUserId,
    };
}