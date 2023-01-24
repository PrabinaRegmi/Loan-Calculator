//Listen submit event

document.getElementById('loan-form').addEventListener('submit', function(e){
//Hide results
document.querySelector("#results").style.display= "none";

//show loader
document.querySelector("#loading").style.display="block";

setTimeout(calculateResults, 2000);

e.preventDefault();
});

//Calcute results function
function calculateResults(){
    //UI variables
    const amount= document.querySelector("#amount");
    const interest= document.querySelector("#interest");
    const years= document.querySelector("#years");
    const monthlyPayment= document.querySelector("#monthly-payment");
    const totalPayment= document.querySelector("#total-payment");
    const totalInterest= document.querySelector("#total-interest");

    const principlal= parseFloat(amount.value);
    const calculatedInterest= parseFloat(interest.value)/100/12;
    const calculatedMonths= parseFloat(years.value)*12;

    //Compute monthly payment
    const x= Math.pow(1 + calculatedInterest, calculatedMonths);
    const monthly= (principlal*calculatedInterest*x)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value= monthly.toFixed(2);
        totalPayment.value= (monthly*calculatedMonths).toFixed(2);
        totalInterest.value= ((monthly*calculatedMonths)-principlal).toFixed(2);

        //show result
        document.querySelector("#results").style.display= "block";

        //hide loader
        document.querySelector("#loading"). style.display= "none";
    }else{
        //call a function with error message
        showError("Please check your numbers");
    }

   
}

//create showError function

function showError(error){
    //Hide result
    document.querySelector("#results").style.display= "none";

    //hide loader
    document.querySelector("#loading"). style.display= "none";
        
    //Create a div
    const errorDiv= document.createElement('div');

    //Get elements
    const card= document.querySelector('.card');
    const heading= document.querySelector('.heading');

    //Add class
    errorDiv.className= 'alert alert-danger';

    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading (//we can insertBefore on a parent and we want to put in and also before which element you want to put in)
    card.insertBefore(errorDiv,heading);

    //Clear error message after 3 seconds
    setTimeout(clearError, 3000);
}

//clearError fucntion
function clearError(){
    document.querySelector(".alert").remove();
}