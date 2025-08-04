const mongoose = require("mongoose")

// Check how many arguments the user entered
if (process.argv.length == 5 || process.argv.length == 3) {
    // Connect to Mongo
    const password = process.argv[2]
    const url = `mongodb+srv://fullstack:${password}@cluster0.gisjv.mongodb.net/phonebook?
    retryWrites=true&w=majority&appName=Cluster0`
    mongoose.set("strictQuery", false)
    mongoose.connect(url)

    // Define the schema and model for a phonebook entry
    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })
    const Person = mongoose.model("Person", personSchema)

    if (process.argv.length == 5) {
        // Create and save new phonebook entry
        const name = process.argv[3]
        const number = process.argv[4]

        const person = new Person({
            name: name,
            number: number
        })

        person.save().then(result => {
            console.log(`Added ${name} with number ${number} to phonebook`)
            mongoose.connection.close()
        })

    } else /* (process.argv.length == 3) */ {
        // List all entries in the phonebook
        console.log("Numbers:")

        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })

    }

} else {
    console.log("Please enter your arguments in the following format if you: ")
    console.log("A.) Want to add a user to the database, or -- node mongo.js yourpassword name number")
    console.log("B.) Want to view all users in the database -- node mongo.js yourpassword")
}