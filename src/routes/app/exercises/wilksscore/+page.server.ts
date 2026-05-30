import { db } from '$lib/server/';
import { recordTable, userTable, exerciseTable } from '$lib/server/database/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { calculateWilksScore } from '$lib/utils/WilksScore.js';

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.safeGetSession();
    const currentUserId = session?.user?.id;

    const bestPerUserExercise = db
        .select({
            userId: recordTable.userId,
            exerciseId: recordTable.exerciseId,
            maxWeight: sql<number>`MAX(${recordTable.liftedWeight})`.as('max_weight'),
        })
        .from(recordTable)
        .groupBy(recordTable.userId, recordTable.exerciseId)
        .as('best_per_user_exercise');

    const rawData = await db
        .select({
            userInfo: {
                id: userTable.id,
                firstName: userTable.firstName,
                lastName: userTable.lastName,
                gender: userTable.gender,
                weight: userTable.weight,
            },
            squatMax: sql<number>`COALESCE(SUM(CASE WHEN ${exerciseTable.name} LIKE 'Squat' THEN ${bestPerUserExercise.maxWeight} ELSE 0 END), 0)`,
            benchMax: sql<number>`COALESCE(SUM(CASE WHEN ${exerciseTable.name} LIKE 'Bench Press' THEN ${bestPerUserExercise.maxWeight} ELSE 0 END), 0)`,
            deadliftMax: sql<number>`COALESCE(SUM(CASE WHEN ${exerciseTable.name} LIKE 'Deadlift' THEN ${bestPerUserExercise.maxWeight} ELSE 0 END), 0)`,
        })
        .from(bestPerUserExercise)
        .leftJoin(userTable, eq(bestPerUserExercise.userId, userTable.id))
        .leftJoin(exerciseTable, eq(bestPerUserExercise.exerciseId, exerciseTable.id))
        .groupBy(userTable.id)
        .execute();

    const leaderboard = rawData
        .map((row) => {
            const totalLiftedKg = ((row.squatMax ?? 0) / 1000) + ((row.benchMax ?? 0) / 1000) + ((row.deadliftMax ?? 0) / 1000);
            
            const wilksScore = row.userInfo?.id 
                ? calculateWilksScore(row.userInfo.gender ?? 'male', row.userInfo.weight ?? 0, totalLiftedKg)
                : 0;

            return {
                user: row.userInfo,
                squat: row.squatMax,
                bench: row.benchMax,
                deadlift: row.deadliftMax,
                total: totalLiftedKg,
                wilks: wilksScore
            };
        })
        .sort((a, b) => b.wilks - a.wilks);

    return {
        leaderboard,
        currentUserId,
    };
};