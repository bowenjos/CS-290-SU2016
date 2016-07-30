document.getElementById('workoutSubmit').addEventListener('click', function(event){

 var req = new XMLHttpRequest();
  		var payload = {name:null,reps:null,weight:null,date:null,lbs:null}
  		payload.name = document.getElementById('name').value;
  		payload.reps = document.getElementById('reps').value;
  		payload.weight = document.getElementById('weight').value;
 		payload.date = document.getElementById('date').value;

		var bool = document.GetElementsByName('lbs');
		if(bool[1].checked){
			payload.lbs = 1;
		} else {
			payload.lbs = 0;
		}

  		req.open('POST', '92.41.137.117:3000/insert-table', true);
  		req.setRequestHeader('Content-Type','application/json');
  		req.send(JSON.stringify(payload));
  		event.preventDefault();
 
 
});
