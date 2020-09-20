var db = require ("../models");

module.exports = function(app) {
    //Retreive last workout
    app.get("/api/workouts", (req, res) => {
        db.workouts.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    });

    //Create new workout in database

app.post("/api/workouts", async (req, res) => {
    try{
        const response = await db.workouts.create({type: "workout"})
        res.json(response);
    }
    catch(err){
        console.log("The following error occured: " + err)
    }
})

// Add exercise to a workout
app.put("/api/workouts/:id", ({body, params}, res) => {
    const workoutID = params.id;
    const savedExercises = [];

    //Finds and gets all saved exercises in current workout
db.workouts.find({_id: workoutID})
.then(workoutdb => {
    savedExercises = workoutdb[0].exercises;
    res.json(workoutsdb[0].exercises);
    const allExercises = [...savedExercises, body]
    console.log(allExercises)
    updateWorkout(allExercises)
})
.catch(err => {
    res.json(err);
});

function updateWorkout(exercises){
    db.workouts.findByIdAndUpdate(workoutID, {exercises: exercises}, function(err, doc){
    if(err){
        console.log(err)
    }

    })
}
    
})

app.get("/api/workouts/range", (req, res) => {
db.workouts.find({})
.then(workout => {
    res.json(workout);
})
.catch(err => {
    res.json(err);
});
});
};