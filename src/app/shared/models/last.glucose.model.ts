export interface ILastGlucoseModel {
    blood_glucose: number,
    created_date: Date,
    time_since_creation: {
        days: number,
        hours: number,
        minutes: number
    }
}