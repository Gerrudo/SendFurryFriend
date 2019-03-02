//DOM Variables 

var viewSelect = document.getElementById('viewSelect')
var selectAView = document.getElementById('selectAView');
var mgmtInfo = document.getElementById('mgmtInfo');
var customerOptions = document.getElementById('customerOptions');
var chooseACustomerOption = document.getElementById('chooseACustomerOption');
var agentPerf = document.getElementById('agentPerf');
var iFrameElem = document.getElementById('iFrameId');
var customerSelect = document.getElementById('customerSelect')
var customerSelectDIV = document.getElementById('customerSelectDIV')
var mainHeader1 = document.getElementById('mainHeader1');
var mainHeader2 = document.getElementById('mainHeader2');

//Functions

//This function is for the customer select drop down. 
function function1(){

    if (customerSelect.value == chooseACustomerOption.innerText){
      iFrameElem.src = '';
      iFrameElem.contentWindow.src.reload();
    }else{
      var newLink = 'https://analytics.zendesk.com/dashboard.html?label.zendesktickets.custom_32856385='+encodeURIComponent(customerSelect.value)+'&label.zendesktickets.custom_32856385='+encodeURIComponent(customerSelect.value)+'#project=/gdc/projects/w3mpjlmt8xf7tierh8e6jgio92zzodym&dashboard=/gdc/md/w3mpjlmt8xf7tierh8e6jgio92zzodym/obj/155747&tab=990d2bdbc2c9'
      iFrameElem.src = newLink;
      console.log(newLink);
      iFrameElem.contentWindow.src.reload();
    }}

//This function is for the select a view drop down
function function2(){
    if (viewSelect.value == customerOptions.innerText){
        iFrameElem.src = '';
        customerSelect.style.display = 'block'; 
    //Management Info select
    }else if(viewSelect.value == mgmtInfo.innerText){
        iFrameElem.src = '';
        customerSelect.style.display = 'none';
        var newLink = 'https://analytics.zendesk.com/dashboard.html#project=/gdc/projects/w3mpjlmt8xf7tierh8e6jgio92zzodym&dashboard=/gdc/md/w3mpjlmt8xf7tierh8e6jgio92zzodym/obj/155845'
        iFrameElem.src = newLink;
        console.log(newLink);
        iFrameElem.contentWindow.src.reload();
    //Agent Performance select
    }else if(viewSelect.value == agentPerf.innerText){
        iFrameElem.src = '';
        customerSelect.style.display = 'none';
        var newLink = 'https://analytics.zendesk.com/dashboard.html#project=/gdc/projects/w3mpjlmt8xf7tierh8e6jgio92zzodym&dashboard=/gdc/md/w3mpjlmt8xf7tierh8e6jgio92zzodym/obj/162855'
        iFrameElem.src = newLink;
        console.log(newLink);
        iFrameElem.contentWindow.src.reload();
    }else{
        customerSelect.style.display = 'none';
        iFrameElem.src = '';
    }
}
customerSelect.style.display = 'none';