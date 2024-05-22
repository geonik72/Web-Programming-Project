'use strict';
// Το sqlite-async χρησιμοποιεί το ίδιο API όπως και το sqlite3, αλλά με promises
import { db } from 'sqlite-async';
import bcrypt from 'bcrypt'

let sql;
try {
    sql = await db.open('db/SkyHop.db')
} catch (error) {
    throw Error('Δεν ήταν δυνατό να ανοίξει η βάση δεδομένων.' + error);
}

//export let getAllTasks = async (userId) => {
    //try {
        //Φέρε όλες τις εργασίας από τη βάση
       //throw new Error('model/sqlite-async/task-list-model-sqlite-async.mjs: το σφάλμα να εμφανίζεται με το μηχανισμό χειρισμού σφαλμάτων στο template views/error.hbs'); 

      //  const stmt = await sql.prepare("SELECT * FROM task WHERE user_id = ?");
      //  const tasks = await stmt.all(userId);
      //  return tasks;
   // } catch (err) {
   //     throw err;
   // }
//}

//export let getTask = async (taskId, userId) => {
    //Φέρε μόνο μια εγγραφή (LIMIT) που να έχει id ίσο με taskId
   // const stmt = await sql.prepare("SELECT * FROM task WHERE id = ? AND user_id = ? LIMIT 0, 1");
   // try {
   //     const task = await stmt.all(taskId, userId);
   //     return task;
   // } catch (err) {
   //     throw err;
   // }
//}

//Προσθήκη μιας νέας εργασίας
//export let addTask = async (newTask, userId) => {
    //Αυτό το ερώτημα εισάγει μια νέα εγγραφή
    //Η πρώτη και η τελευταία τιμή (το null και το CURRENT_TIMESTAMP) εισάγονται από την SQLite
    //Το null αφήνει την SQLite να διαλέξει τιμή (αύξοντας αριθμός)
    //To CURRENT_TIMESTAMP σημαίνει την τρέχουσα ώρα και ημερομηνία
    //const stmt = await sql.prepare('INSERT INTO task VALUES (null, ?, ?, CURRENT_TIMESTAMP, ?)');

    //try {
    //    const info = await stmt.run(newTask.task, newTask.status, userId);
    //    // Επιστρέφουμε την τιμή του info.lastInsertRowid που δίνει η ίδια η βάση και εξασφαλίζουμε έτσι πως κάθε εγγραφή έχει μοναδικό id
    //    return info.lastInsertRowid;
   // }
   // catch (err) {
   ///     throw err;
   // }
//}

//Αλλαγή της κατάστασης μιας εργασίας
//export let toggleTask = async (taskId, userId) => {
    //Αν η εγγραφή με id ίσο με taskId έχει status=0 τότε κάντο 1, αλλιώς κάντο 0
   // const stmt = await sql.prepare('UPDATE task SET status = CASE WHEN status = 0 THEN 1 ELSE 0 END WHERE id = ? AND user_id = ?');
    //try {
    //    await stmt.run(taskId, userId);
     //   return true
    //}
   // catch (err) {
    //    throw err;
    //}
//}

//Αφαίρεση μιας εργασίας
//export let removeTask = async (taskId, userId) => {
  //  const stmt = await sql.prepare("DELETE FROM task WHERE id = ? AND user_id = ?");
  //  try {
   //     await stmt.run(taskId, userId);
    //    return true;
    //}
    //catch (err) {
    //    throw err;
    //}
//}

export let findUserByUsernamePassword = async (email, password) => {
    //Φέρε μόνο μια εγγραφή (το LIMIT 0, 1) που να έχει username και password ίσο με username και password 
    const stmt = await sql.prepare("SELECT email FROM users WHERE email = ? and password = ? LIMIT 0, 1");
    try {
        const user = await stmt.all(email, password);
    } catch (err) {
        throw err;
    }
}

//Η συνάρτηση δημιουργεί έναν νέο χρήστη
export let registerUserNoPass = async function (email) {
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    const emailId = getUserByUsername(email);
    if (emailId != undefined) {
        return { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" };
    } else {
        try {
            const stmt = await sql.prepare('INSERT INTO users VALUES (null, ?, ?)');
            const info = await stmt.run(email, username);
            return info.lastInsertRowid;
        } catch (err) {
            throw err;
        }
    }
}

/**
 * Επιστρέφει τον χρήστη με όνομα 'username'
 */
export let getUserByUsername = async (email) => {
    const stmt = await sql.prepare("SELECT id, email, password FROM users WHERE email = ? LIMIT 0, 1");
    try {
        const user = await stmt.all(email);
        return user[0];
    } catch (err) {
        throw err;
    }
}

//Η συνάρτηση δημιουργεί έναν νέο χρήστη με password
export let registerUser = async function (email, password) {
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    const userId = await getUserByUsername(email);
    if (emailId != undefined) {
        return { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" };
    } else {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const stmt = await sql.prepare('INSERT INTO users VALUES (null, ?, ?)');
            const info = await stmt.run(email, hashedPassword);
            return info.lastID;
        } catch (error) {
            throw error;
        }
    }
}