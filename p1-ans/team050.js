const towers = {
  A: document.getElementById("towerA"),
  B: document.getElementById("towerB"),
  C: document.getElementById("towerC")
};

let n;
let less = document.getElementById("less");
let count = document.getElementById("count");
let move = 0;

function select() {
    
    n = document.getElementById("disk_num").value;
    let c = 2**n - 1;
    less.innerHTML = c;
    
    restart();

}

function restart() {
    move = 0;
    count.innerHTML = move;
    
    // for (let i = 0; i < n; i++) {
    //     document.querySelector('.disk').remove();
    // }
    
    while (document.querySelector('.disk')) {
        document.querySelector('.disk').remove();
    }
    
    
    disk_on_tower();
    
    
}


let selectedDisk = null;

function disk_on_tower() {
    for (let i = 1; i <= n; i++) {
        const disk = document.createElement("div");
        disk.className = `disk disk${i}`;
        disk.draggable = true;
        towers.A.appendChild(disk);

        disk.addEventListener("dragstart", (e) => {
        if (disk === disk.parentElement.firstChild) { 
            selectedDisk = disk;
            setTimeout(() => disk.style.display = "none", 0);
        } else {
            e.preventDefault();
        }
        });

        disk.addEventListener("dragend", () => {
        selectedDisk.style.display = "block";
        selectedDisk = null;
        });
    }
}

disk_on_tower();

Object.values(towers).forEach(tower => {
    tower.addEventListener("dragover", (e) => e.preventDefault());
    tower.addEventListener("drop", () => {
    if (!selectedDisk) return;
        const topDisk = tower.firstChild;
    if (!topDisk || parseInt(selectedDisk.className.match(/\d/)) < parseInt(topDisk.className.match(/\d/))) {
        tower.insertBefore(selectedDisk, topDisk);
        move += 1;
        count.innerHTML = move;
    }
    });
});