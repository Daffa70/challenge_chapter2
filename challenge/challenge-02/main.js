const readline = require("readline");

class StudentGrade {
  constructor(arrayGrades) {
    this.grades = arrayGrades;
  }

  getMaxGrade() {
    let arr = this.sortGrades();
    let studentPos = this.findPositionStudents(arr[arr.length - 1].nilai);

    console.log(`Nilai tertinggi: ${arr[arr.length - 1].nilai}`);

    for (let i = 0; i < studentPos.length; i++) {
      console.log(`Didapatkan oleh siswa ke: ${studentPos[i] + 1}`);
    }

    console.log("---------------------------");
  }

  getMinGrade() {
    let arr = this.sortGrades();
    let studentPos = this.findPositionStudents(arr[0].nilai);

    //console.log(studentPos);
    console.log(`Nilai terendah: ${arr[0].nilai}`);

    for (let i = 0; i < studentPos.length; i++) {
      console.log(`Didapatkan oleh siswa ke: ${studentPos[i] + 1}`);
    }

    console.log("---------------------------");
  }

  getAverageGrade() {
    let totalGrade = 0;

    for (let i = 0; i < this.grades.length; i++) {
      totalGrade = totalGrade + this.grades[i].nilai;
    }

    console.log(`Rata-rata nilai : ${totalGrade / this.grades.length}`);
    console.log("---------------------------");
  }

  getNumPassed() {
    let gradePassed = 0;
    let studentPassed = [];

    for (let i = 0; i < this.grades.length; i++) {
      if (this.grades[i].nilai >= 75) {
        studentPassed = studentPassed.concat(this.grades[i]);
        gradePassed++;
      }
    }

    console.log(`Jumlah siswa lulus: ${gradePassed}`);

    for (let i = 0; i < studentPassed.length; i++) {
      console.log(
        `Didapatkan oleh siswa ke: ${studentPassed[i].siswa} dengan nilai: ${studentPassed[i].nilai}`
      );
    }

    console.log("---------------------------");
  }

  getNumFailed() {
    let gradeFailed = 0;
    let studentFailed = [];

    for (let i = 0; i < this.grades.length; i++) {
      if (this.grades[i].nilai < 75) {
        studentFailed = studentFailed.concat(this.grades[i]);
        gradeFailed++;
      }
    }

    console.log(`Jumlah siswa tidak lulus: ${gradeFailed}`);

    for (let i = 0; i < studentFailed.length; i++) {
      console.log(
        `Didapatkan oleh siswa ke: ${studentFailed[i].siswa} dengan nilai: ${studentFailed[i].nilai}`
      );
    }

    console.log("---------------------------");
  }

  getSortedGrade() {
    let arr = this.sortGrades();

    console.log("Urutan nilai siswa dari terkecil: ");

    for (let i = 0; i < arr.length; i++) {
      console.log(
        `${i + 1}. Siswa ke: ${arr[i].siswa} dengan nilai: ${arr[i].nilai}`
      );
    }

    console.log("---------------------------");
  }

  findGrades(grade) {
    let find = 0;
    let studentPos = this.findPositionStudents(grade);

    console.log(`Siswa dengan nilai ${grade}: ${studentPos.length}`);

    for (let i = 0; i < studentPos.length; i++) {
      console.log(`Didapatkan oleh siswa ke: ${studentPos[i] + 1}`);
    }

    console.log("---------------------------");
  }

  sortGrades() {
    let arrSorted = Object.assign([], this.grades);
    for (let i = arrSorted.length - 1; i >= 0; i--) {
      for (let j = 1; j <= i; j++) {
        if (arrSorted[j - 1].nilai > arrSorted[j].nilai) {
          var temp = arrSorted[j - 1];
          arrSorted[j - 1] = arrSorted[j];
          arrSorted[j] = temp;
        }
      }
    }

    return arrSorted;
  }

  findPositionStudents(grade) {
    let student = [];

    for (let i = 0; i < this.grades.length; i++) {
      if (this.grades[i].nilai == grade) {
        student.push(i);
      }
    }

    return student;
  }

  displayResults() {
    console.log("---------------------------");
    this.getMaxGrade();
    this.getMinGrade();
    this.getAverageGrade();
    this.getNumPassed();
    this.getNumFailed();
    this.getSortedGrade();
    this.findGrades(90);
    this.findGrades(100);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(question) {
  return new Promise((resolve) => {
    rl.question(question, (data) => {
      resolve(data);
    });
  });
}

let studentsCounts = 1;

async function inputGradeStudent() {
  try {
    let grades = [];

    if (studentsCounts == 1) {
      console.log("Masukan Nilai Siswa Inputkan Selain Number Untuk Selesai");
    }

    let grade = await question(`Masukan nilai siswa ke-${studentsCounts}: `);

    if (grade.trim() === "") {
      studentsCounts--;
      rl.close();
      return grades;
    } else if (!isNaN(Number(grade))) {
      if (Number(grade) > 100 || Number(grade) < 0) {
        console.log(
          "Angka yang dimasukan harus kurang dari 100 dan lebih dari 0"
        );
        return await inputGradeStudent();
      } else {
        grades.push({ siswa: studentsCounts, nilai: Number(grade) });
        studentsCounts++;
        let remainingGrades = await inputGradeStudent(); // mengakumulasi nilai return array
        grades = grades.concat(remainingGrades); // menggabungkan nilai array saat ini dengan nilai array yang terbaru
        return grades;
      }
    } else {
      studentsCounts--;
      rl.close();
      return grades;
    }
  } catch (err) {
    console.log(err);
    rl.close();
  }
}

async function main() {
  let getInput = await inputGradeStudent();
  //console.log(getInput.length);
  let studentGrade = new StudentGrade(getInput);
  studentGrade.displayResults();
}

main();
