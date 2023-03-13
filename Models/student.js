let database = require("../Database/database.json");
let {loadData, saveData } = require("./read_write");
const prompt = require("prompt-sync")();

class Student {
    get_register(){
        console.log("Register: ");
        const name = prompt("Enter name: ");
        const id = prompt("Enter ID: ");
        const username = prompt("Enter username: ");
        const password = prompt("Enter password: ");
        let student = {
            name: name,
            id: Number(id),
            username: username,
            password: password,
            enrolled: [],
            unrolled: []
        };

        let data = loadData();
        data.students.push(student);
            saveData(data);
        console.log("Registration Completed");
    }

    check_student(username, password){
        let data = loadData();
        let index = 0;
        for(const check of data.students){
            if(check.username == username && check.password == password){
                return [check.name, check.id, index];
            }
            index++;
        }
        return [null, -1];
    }

    select_course(){
        const name = prompt("Enter Course name: ");
        const id = prompt("Enter course id: ");
        const course = {name, id};
        return course;
    }

    check_enroll(course, indx){
        const data = loadData();
        let index = 0;
        for(const check of data.students[indx].enrolled){
            if(check.name == course.name && check.id == course.id){
                return index;
            }
            index++;
        }
        return -1;
    }

    available_course(course){
        const data = loadData();
        let index = 0;
        for(const check of data.courses){
            if(check.name == course.name && check.id == course.id){
                return index;
            }
            index++;
        }
        return -1;
    }

    enroll_course(indx){
        const course = this.select_course();
        const index = this.check_enroll(course, indx);
        const index2 = this.available_course(course);
        if(index2 == -1) console.log("This course is not available");
        else if(index == -1){
            const data = loadData();
            data.students[indx].enrolled.push(course);
            data.students[indx].unrolled.splice(index,1);
            saveData(data);
            console.log("Successfully enrolled the course");
        }else console.log("You have already enrolled to this course...");
    }

    unroll_course(indx){
        const course = this.select_course();
        let index = this.check_enroll(course,indx);
        let index2 = this.check_unroll(course,indx);
        if(index == -1)console.log("You are not enrolled in this course");
        else {
            const data = loadData();
            data.students[indx].unrolled.push(course);
            data.students[indx].enrolled.splice(index,1);
            saveData(data);
            console.log("Successfully Unrolled");
        }
    }

    delete_account(index){
        let data = loadData();
        data.students.splice(index, 1);
        saveData(data);
        console.log("Successfully deleted");
    }
}

module.exports = Student;