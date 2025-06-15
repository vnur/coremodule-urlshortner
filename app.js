const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let task = [];

const showInterface = () => {
  console.log("1: create Task");
  console.log("2: read Task");
  console.log("3: update Task");
  console.log("4: delete Task");
  console.log("5: exit Task");
  console.log("\n");

  rl.question("choose option : ", (option) => {
    switch (parseInt(option)) {
      case 1:
        rl.question("add task : ", (taskvalue) => {
          task.push(taskvalue);
          console.log("\n");
          showInterface();
        });
        break;
      case 2:
        task.forEach((item, index) => {
          console.log(index + 1, item);
        });
        console.log("\n");
        showInterface();
        break;

      case 3:
        rl.question("update task : ", (data) => {
          if (task.includes(data)) {
            const indexno = task.indexOf(data);
            console.log(indexno);

            rl.question("please tell me update data : ", (updateddata) => {
              task[indexno] = updateddata;
              task.forEach((item, index) => {
                console.log(index + 1, item);
              });

              console.log("\n");
              showInterface();
            });
          } else {
            console.log("item not found");
            console.log("\n");
            showInterface();
          }
        });
        break;


        case 4:
            rl.question("delete task : ", (value)=>{

                const updateddeleted = task.filter((item)=>{
                    return item !== value
                })
                
                task = updateddeleted
                
                console.log("\n");
                showInterface()
            })
            break;








      case 5:
        console.log("good bye ");
        rl.close();
        break;
      default:
        console.log("your are type wrong please type correct option");
        console.log("\n");
        showInterface();
    }
  });
};

showInterface();
