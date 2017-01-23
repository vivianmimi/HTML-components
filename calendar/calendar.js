/*
* construnctor
*
* @para {Dom} selector
* @para {json} data
* @para {array} courses
*/
var Calendar = function(selector){
	this.calendar = document.querySelector(selector);
	this.table = document.createElement('table');
	this.date = new Date();
	console.log(this.date);
	this.init();
}

Calendar.prototype = {
	
	MonthName : ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemper', 'October', 'Novermber', 'December'],
	WeekName : ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'], 
	/*
	* initiate calendar header and table
	*/
	init : function(){
		var self = this;
		//init title
		var titleBox = document.createElement('div');
			titleBox.className = 'title';
		var leftBtn = document.createElement('button');
			leftBtn.className = 'leftri';
			addEvent(leftBtn,'click',function(e){self.gotoPreviousMonth();});
		var rightBtn = document.createElement('button');
			rightBtn.className = 'rightri';
			addEvent(rightBtn,'click',function(e){self.gotoNextMonth();});
		var title = document.createElement('p');
			title.innerHTML = self.date.getFullYear() + " " + self.MonthName[self.date.getMonth()];
		removeChildrenNodes(this.calendar);
		removeChildrenNodes(this.table);
		titleBox.appendChild(leftBtn);
		titleBox.appendChild(title);
		titleBox.appendChild(rightBtn);
		this.calendar.appendChild(titleBox);

		//init week
		var weektr = document.createElement('tr');
		for (var i = 0; i < this.WeekName.length; i++) {
			var weektd = document.createElement('td');
			weektd.innerHTML = this.WeekName[i];
			weektr.appendChild(weektd);
		}
		this.table.appendChild(weektr);
		this.generateDays();
		//load datedata
		this.render();
	},

	render : function(){
		this.calendar.appendChild(this.table);
	},

	/*
	* generate calendar content
	*
	* @ return {DOM} 
	*/

	generateDays : function(){
		var currentYear = this.date.getFullYear();
		var currentMonth = this.date.getMonth();
		var currentDate = this.date.getDate();

		var self = this;
		//find the first day in current month
		var firstDayinThisMonth = new Date(currentYear,currentMonth,1);
		var weekofFirstDay = firstDayinThisMonth.getDay();
		//find the last day in current month
		var firstDayinNextMonth = new Date(currentYear,(currentMonth+1),0);
		var lastDayinThisMonth = firstDayinNextMonth.getDate();
		//find the last day in last month
		var lastDayinLastMonth = new Date(currentYear,currentMonth,0);
		var dayofLastMonth = lastDayinLastMonth.getDate();

		//first row
		var tr1 = document.createElement('tr');
		for (var i = 0; i < weekofFirstDay; i++) {
			var day = document.createElement('td');
			day.innerHTML = dayofLastMonth - weekofFirstDay + 1 + i;
			day.className = 'notCurrentMonth';
			addEvent(day,'click',function(e){
				self.gotoPreviousMonth();
			});
			tr1.appendChild(day);
		}
		var date = 1;
		for (var i = weekofFirstDay; i < 7; i++) {
			var day = document.createElement('td');
			day.innerHTML = date;
			if(date == currentDate){day.className = 'currentDate';}
			tr1.appendChild(day);
			date++;
		}
		this.table.appendChild(tr1);
		var lasttr = 1;
		while(date <= lastDayinThisMonth){
			var tr = document.createElement('tr');
			for (var i = 0; i < 7; i++) {
				var day = document.createElement('td');
				if (date > lastDayinThisMonth) {
					day.innerHTML = lasttr;
					day.className = 'notCurrentMonth';
					addEvent(day,'click',function(e){self.gotoNextMonth();});
					lasttr++;
				} else {
					day.innerHTML = date;
					addEvent(day,'click',function(e){
						self.setDate(e.target.innerHTML);
					});
					if(date == currentDate){day.className = 'currentDate';}
				}
				tr.appendChild(day);
				date++;
			}
			this.table.appendChild(tr);
		}
	},

	/*
	* set day by click
	*
	* @ para {string} day
	*/
	setDate : function(day){
		this.date = new Date(this.date.getFullYear(),this.date.getMonth(),day);
		this.init();
	},

	/*
	* go to previous month
	*/
	gotoPreviousMonth : function(){
		this.date = new Date(this.date.getFullYear(),this.date.getMonth()-1,this.date.getDate());
		this.init();
	},

	/*
	* go to next month
	*/
	gotoNextMonth : function(){
		this.date = new Date(this.date.getFullYear(),this.date.getMonth() + 1,this.date.getDate());
		this.init();
	}
}