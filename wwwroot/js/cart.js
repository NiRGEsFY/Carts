let inputCartForm = document.getElementById("templateInputCartBackground");
let finalAdditionCartButton = document.getElementById("templateInputCartConfirm"); 
let additionCartButton = document.getElementById("cartsMenuAdd");
let changeCartButton = document.getElementById("cartsMenuChange");
let cancelAdditionButton = document.getElementById("templateInputCartCancel");



let cartArray = [];

searchCarts.forEach(element =>{
    cartArray.push(element);
});

let listChangedCart = [];

class ChangedCart{
    constructor(id,mark,number,weight,security){
        this.Id = id,
        this.Mark = mark,
        this.Number = number,
        this.Weight = weight,
        this.Security = security

    }
}
changeCartButton.addEventListener('click',()=>{
    finalAdditionCartButton.textContent = "Изменить";
    inputCartForm.style.display = "flex";
    templateInputCartFirstInput.value = selectCartItem.Mark;
    templateInputCartSecondInput.value = selectCartItem.Number;
    templateInputCartThirdInput.value = selectCartItem.Weight;
});
additionCartButton.addEventListener('click', ()=>{
    finalAdditionCartButton.textContent = "Добавить";
    inputCartForm.style.display = "flex";
    
});
finalAdditionCartButton.addEventListener('click',()=>{
    inputCartForm.style.display = "none";
    let inputMark = document.getElementById("templateInputCartFirstInput");
    let inputNumber = document.getElementById("templateInputCartSecondInput");
    let inputWeight = document.getElementById("templateInputCartThirdInput");

    if(finalAdditionCartButton.textContent === "Добавить"){
        $.ajax({
            type: "POST",
            url: "/Carts/Cart",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({ Mark: inputMark.value, Number: inputNumber.value, Weight: inputWeight.value}),
            success: function(response){
                console.log(response);
            },
            error: function(response){
                console.log(response)
                console.log("" + inputMark.value + "|" + inputNumber.value + "|" + inputWeight.value)
            }
        });
        setTimeout(()=>{
            window.location.reload(true);
        },300);
    }
    else if(finalAdditionCartButton.textContent === "Изменить"){
        listChangedCart.push(new ChangedCart(selectCartItem.Id,templateInputCartFirstInput.value,templateInputCartSecondInput.value,templateInputCartThirdInput.value, selectCartItem.Security));
        selectCartDiv.childNodes[3].textContent = templateInputCartFirstInput.value;
        selectCartDiv.childNodes[5].textContent = templateInputCartSecondInput.value;
        cancelCartButton.classList.remove("noActive");
        saveCartButton.classList.remove("noActive");
        additionCartButton.classList.add("noActive");
        changeCartButton.classList.add("noActive");
removeCartButton.classList.add("noActive");
    }
});
templateInputCartCancel.addEventListener('click',()=>{
    inputCartForm.style.display = "none";
});

let confirmingForm = document.getElementById("templateConfirmingActionBackground");
let confirmingAccept = document.getElementById("acceptConfirming");
let confirmingCancel = document.getElementById("cancelConfirming");
let confirmingText = document.getElementById("nameConfirming");
let statusConfirming = '';
function removeConfrimForm(){
    confirmingForm.style.display = "none";
}
function confirmChangeStatus(text){
    let outText = '';
    switch(text){
        case "saveCartBug":
        case "saveCart":
            outText = "сохранении"
            break;
        case "removeCartBug":
        case "removeCart":
            outText = "удалении";
            break;
        case "cancelCartBug":
        case "cancelCart":
            outText = "отмене";
            break;
    }
    confirmingText.textContent = "Вы уверены в " + outText + "?";
    confirmingForm.style.display = "flex";
    statusConfirming = text;
}
function confirmStatus(){
    switch(statusConfirming){
        case"saveCart":
        listChangedCart.forEach(element=>{
            $.ajax({
                type: "POST",
                url: "/Carts/Cart/"+element.Id,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify(element),
                success: function(response){
                    console.log(response);
                },
                error: function(response){
                    console.log(response)
                }
            });
        })
            break;
        case "removeCart":
            $.ajax({
                type: "DELETE",
                url: "/Carts/Cart/"+selectCartItem.Number,
                success: function(response){
                    console.log(response);
                },
                error: function(response){
                    console.log(response)
                }
            });
            break;
            
        case "cancelCart":
            cancelCartButton.classList.add("noActive");
            saveCartButton.classList.add("noActive");
            listChangedCart = [];
            additionCartButton.classList.remove("noActive");
            listDivCart.forEach(element =>{
                element.remove();
            });
            refreshCart();
            break;
    }
    removeConfrimForm();
    setTimeout(()=>{
        window.location.reload(true);
    },300);
}
confirmingCancel.addEventListener("click",removeConfrimForm)
confirmingAccept.addEventListener("click",confirmStatus)
let saveCartButton = document.getElementById("cartsMenuSave");
saveCartButton.addEventListener('click', () => confirmChangeStatus("saveCart"));
let removeCartButton = document.getElementById("cartsMenuRemove");
removeCartButton.addEventListener('click', () => confirmChangeStatus("removeCart"));
let cancelCartButton  = document.getElementById("cartsMenuCancel");
cancelCartButton.addEventListener('click', () => confirmChangeStatus("cancelCart"));
cancelCartButton.classList.add("noActive");
saveCartButton.classList.add("noActive");
changeCartButton.classList.add("noActive");
removeCartButton.classList.add("noActive");


saveCartButton.addEventListener('click',()=>{

    
})

let findButton = document.getElementById("findButton").addEventListener('click',()=>{
    window.location.href = '/Carts?number='+document.getElementById("inputFindCarts").value;
});
let templateCart = document.getElementById("cartsTemplate");

let selectCartItem;
let selectCartDiv;
let listDivCart = [];
function refreshCart(){
    templateCart.style.display = "none";
    cartArray.forEach(element=>{
        let newCart = templateCart.cloneNode(true);
        newCart.style.display = "grid";
        newCart.childNodes[1].textContent = element.Id;
        newCart.childNodes[3].textContent = element.Mark;
        newCart.childNodes[5].textContent = element.Number;
        let dateTime = new Date(element.Changed);
        newCart.childNodes[7].childNodes[1].checked = true;
        newCart.childNodes[9].textContent = dateTime.getFullYear() + '.' +
        ('0' + (dateTime.getMonth() + 1)).slice(-2) + '.' +
        ('0' + dateTime.getDate()).slice(-2) + ' ' +
        ('0' + dateTime.getHours()).slice(-2) + ':' +
        ('0' + dateTime.getMinutes()).slice(-2) + ':' +
        ('0' + dateTime.getSeconds()).slice(-2);
        newCart.addEventListener('click',()=>{
            selectCartItem = element;
            selectCartDiv = newCart;
            listDivCart.forEach(div=>{
                div.classList.remove("selectCart");
            });
            newCart.classList.add("selectCart");
            changeCartButton.classList.remove("noActive");
            removeCartButton.classList.remove("noActive");
            refreshCartBugs();
        })
        listDivCart.push(newCart);
        templateCart.after(newCart);
    });

    console.log();
}
refreshCart();

let addCartBugButton = document.getElementById("cartsBugMenuAdd");
addCartBugButton.classList.add("noActive");
let changeCartBugButton = document.getElementById("cartsBugMenuChange");
changeCartBugButton.classList.add("noActive");
let removeCartBugButton = document.getElementById("cartsBugMenuRemove");
removeCartBugButton.classList.add("noActive");
let saveCartBugButton = document.getElementById("cartsBugMenuSave");
saveCartBugButton.classList.add("noActive");
let cancelCartBugButton = document.getElementById("cartsBugMenuCancel");
cancelCartBugButton.classList.add("noActive");
let cancelAddCartBug = document.getElementById("templateInputCartBugsCancel");

let templateInputCartBugsBackground = document.getElementById("templateInputCartBugsBackground");
let finalAdditionCartBugButton = document.getElementById("templateInputCartBugsConfirm");

removeCartBugButton.addEventListener('click',()=>{confirmChangeStatus("removeCartBug")});
saveCartBugButton.addEventListener('click',()=>{confirmChangeStatus("saveCartBug")});
cancelCartBugButton.addEventListener('click',()=>{confirmChangeStatus("cancelCartBug")});

cancelAddCartBug.addEventListener('click',()=>{
    templateInputCartBugsBackground.style.display = "none";
})
let templateInputCartBugsSecondInput = document.getElementById("templateInputCartBugsSecondInput");
let templateInputCartBugsFirstInput = document.getElementById("templateInputCartBugsFirstInput");
let templateInputCartBugsThirdInput  =document.getElementById("templateInputCartBugsThirdInput");

addCartBugButton.addEventListener('click', ()=>{
    finalAdditionCartBugButton.textContent = "Добавить";
    templateInputCartBugsBackground.style.display = "flex";
    let now = new Date();
    let nowText = now.getFullYear() + '-' +
    ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
    ('0' + now.getDate()).slice(-2) + 'T' +
    ('0' + now.getHours()).slice(-2) + ':' +
    ('0' + now.getMinutes()).slice(-2);
    templateInputCartBugsFirstInput.value = nowText;
});
finalAdditionCartBugButton.addEventListener('click',()=>{

    if(finalAdditionCartBugButton.textContent === "Добавить"){
        $.ajax({
            type: "POST",
            url: "/Carts/CartBug/"+selectCartItem.Number,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({ EndTime: templateInputCartBugsSecondInput.value, StartTime: templateInputCartBugsFirstInput.value, Descrition: templateInputCartBugsThirdInput.value}),
            success: function(response){
                console.log(response);
            },
            error: function(response){
                console.log(response)
            }
        });
    }
    else if(finalAdditionCartBugButton.textContent === "Изменить"){
        listChangedCart.push(new ChangedCart(selectCartItem.Id,templateInputCartFirstInput.value,templateInputCartSecondInput.value,templateInputCartThirdInput.value, selectCartItem.Security));
        selectCartDiv.childNodes[3].textContent = templateInputCartFirstInput.value;
        selectCartDiv.childNodes[5].textContent = templateInputCartSecondInput.value;
        cancelCartButton.classList.remove("noActive");
        saveCartButton.classList.remove("noActive");
        additionCartButton.classList.add("noActive");
        changeCartButton.classList.add("noActive");
removeCartButton.classList.add("noActive");
    }

})

let templateCartBug = document.getElementById("cartBugTemplate");
templateCartBug.style.display = "none";

let selectedBug;
let selectedBugDiv;
let listSelectedCartBugs = [];
let listSelectedCartBugsDiv = [];

function refreshCartBugs(){
    document.getElementById("cartsBugContentName").textContent = "Простои по погрузчику " +selectCartItem.Number;
    addCartBugButton.classList.remove("noActive");
    listSelectedCartBugsDiv = [];
    listSelectedCartBugs = [];
    selectCartItem.CartBugs.forEach(element =>{
        let newCartBug = templateCartBug.cloneNode(true);
        newCartBug.style.display = "grid";
        templateCartBug.after(newCartBug);
        listSelectedCartBugsDiv.push(newCartBug);
        listSelectedCartBugs.push(element);
        newCartBug.addEventListener(('click',()=>{
            selectedBug = element;
            selectedBugDiv = newCartBug;
        }));
    });
}