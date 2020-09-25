Object.defineProperty(Array.prototype, 'chunck_element', {
    value: function(chunkSize) {
      var array = this;
      return [].concat.apply([],
        array.map(function(elem, i) {
          return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
        })
      );
    }
  });

jQuery(function($){

    /*STARTING CALENDER CODING*/
    let theDate = new Date(),
        index = 0;
    let monthNames = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];
        //FUNCTION FOR GET MONTH DAYS NUMBER
    let getDaysInMonth = function(year,month) {
       return new Date(year, month, 0).getDate();
      };
      
      $('.content p').html(monthNames[0]);
     $('.content-ul-li table tbody').html(getDays(getDaysInMonth(theDate.getFullYear(), index + 1), index + 1));
     $('.content-ul-li table tbody').prepend('<tr style="width: 100%; height: 1rem;"></tr>');
     //RIGHT ARROW FUNCTION 
      $('.calender-content-child .arrow-right').on({
          'click':function(){
            index++;
            if(index >= 12) {
                index = 0;
            }
              $('.content p').html(monthNames[index]);
              $('.content-ul-li table tbody').html(getDays(getDaysInMonth(theDate.getFullYear(), index + 1), index + 1));
              $('.content-ul-li table tbody').prepend('<tr style="width: 100%; height: 1rem;"></tr>');
              getResult();
          }
      });
      //LEFT ARROW FUNCTION
      $('.calender-content-child .arrow-left').on({
        'click':function(){
          index--;
          if(index == -1 || index < 0) {
              index = 11;
          }
          $('.content-ul-li table tbody').html(getDays(getDaysInMonth(theDate.getFullYear(), index + 1), index + 1));
          $('.content-ul-li table tbody').prepend('<tr style="width: 100%; height: 1rem;"></tr>');
          $('.content p').html(monthNames[index]);
          getResult();
        }
    });

    //GET TR FROM DAYS
    function getDays(number = 0, month = 1) {
        let numberArr = [];
        //ADDING NUMBER TO ARRAY
        for (let i = 1; i <= number; i++){
            numberArr.push(i);
        }
        //CHUNK ELEMENTS 
        let arrChunck = numberArr.chunck_element(7);
        let trContent = '';
        for(let x = 0; x < arrChunck.length; x++) {
            trContent += '<tr data-month="'+month+'">';
            for(let y = 0 ; y < arrChunck[x].length; y++) {
                trContent += '<td data-content="'+arrChunck[x][y]+'">';
                trContent += arrChunck[x][y];
                trContent += '</td>';
            }
            trContent += '</tr>';
        }
        return trContent;
    }
    //CHECK YOUR DAY 
    let dateArr =
                {
                    day: theDate.getDate(),
                    month: theDate.getMonth(),
                    year: theDate.getFullYear(),
                    hour: theDate.getHours(),
                    status: 'am'
                };

    function getResult(){
        $('.content-ul-li table tbody tr  td').each(function() {
            $(this).on({
                'click': function(){
                    let currentDay = '';
                    $(this).toggleClass('td-active').siblings().removeClass('td-active');
                    $(this).parent().siblings().find('td').removeClass('td-active');
                    if($(this).hasClass('td-active')) {
                        currentDay = $(this).data('content');
                    } else {
                        currentDay = null;
                    }
                    dateArr.day = currentDay;
                    dateArr.month = $(this).parent().data('month');
                    dateArr.year = theDate.getFullYear();
                }
            });
        });
    }
    getResult();

    $('.set-date-time span').on({
        'click':function(){
            let hourIn  = $('#hourInput').val(),
                getAmPm = $('#getAmPm').val();
                dateArr.hour = hourIn;
                dateArr.status = getAmPm;
                console.log(dateArr);
                $('.calender-content-child').removeClass('calender-active');
        }
    });

    $('.calender-icon p').on({
        'click': function() {
            $('.calender-content-child').addClass('calender-active');
        }
    });
    /*ENDING*/

    /*MAIN POP UP MENUS*/
    $('.menu-li i').on({
        'click' : function(){
            $(this).parent().toggleClass('menu-active').siblings().removeClass('menu-active');
        }
    });
    $('.menu-li b').on({
        'click' : function(){
            $(this).parents('li').removeClass('menu-active');
        }
    });
    /*ENDING*/
    /*LEFT  MENU */
        if(!$('.leftMenuSec').hasClass('left-menu-active')){
            $('.icon-th-large').css({
                'color' : '#fa26a0'
            });
        } else {
            $('.icon-th-large').css({
                'color' : '#000'
            });
        }
    $('.icon-th-large').on({
        'click': function(){
            $('.leftMenuSec').toggleClass('left-menu-active');
            if(!$('.leftMenuSec').hasClass('left-menu-active')){
                $(this).css({
                    'color' : '#fa26a0'
                });
            } else {
                $(this).css({
                    'color' : '#000'
                });
            }
        }
    });
    $('.leftMenuSec .left-content .icon-left-big').on({
        'click': function(){
            $('.leftMenuSec').addClass('left-menu-active');
            if(!$('.leftMenuSec').hasClass('left-menu-active')){
                $('.icon-th-large').css({
                    'color' : '#fa26a0'
                });
            } else {
                $('.icon-th-large').css({
                    'color' : '#000'
                });
            }
        }
    });
    /*ENDING*/
    /*LISTS IN LEFT MENU*/
    $('.leftMenuSec .left-content .content ul li i').each(function(){
        $(this).on({
            'click' :function(){
                $(this).parents('li').toggleClass('active').siblings().removeClass('active');
            }
        });
    });
    /*ENDING*/
     /*START CHECKING BOX*/
     $('.active-sec #but-check').on({
        'click': function(){

            $(this).parent().toggleClass('check-active');

            if($(this).parent().hasClass('check-active')) {
                $('.active-sec input[type=checkbox]').val(1);
            } else {
                $('.active-sec input[type=checkbox]').val(0);
            }
        }
    });
    /*END CHECKING BOX*/
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
    
            reader.onload = function (e) {
                document.querySelector('.image-view p').innerHTML = '<img src="'+ e.target.result+'" alt="banner">';
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }

    $('.image-section .image-b #choose-button').on({
        'click': function(e){
            e.preventDefault();
            $('.image-section .image-b #file').click();
            $('.image-section .image-b #file').on({
                'change' :function(){
                    readURL(this);
                }
            });
        }
    });
    $('.image-section .image-view #current-image').on({
        'click': function(e){
            e.preventDefault();
            $('.image-section .image-b #file').click();
            $('.image-section .image-b #file').on({
                'change' :function(){
                    readURL(this);
                }
            });
        }
    });
    /*STARTING CHOOSING IMAGE*/

    /*ENDING  CHOSSING IMAGE*/
    /*STARTING CHART*/
    function chart1(){
        var ctx = document.getElementById('chart-0').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
            datasets: [{
                label: 'Orders',
                data: [3, 19, 8, 7, 2, 2, 6, 9, 3, 11, 4, 15],
                backgroundColor: [
                    'rgba(255, 219, 182, 0.1)',
                ],
                borderColor: '#ff982f'
            },
            {
                label: 'Products',
                data: [5, 9, 14, 13, 2, 6, 5, 10 , 4, 13, 18, 7],
                backgroundColor: [
                    'rgba(253, 210, 219, 0.1)',
                ],
                borderColor: '#ff436b'
            },
            {
                label: 'Inventory',
                data: [8, 11, 3, 5, 22, 10, 9, 12, 6, 18, 10, 9],
                backgroundColor: [
                    'rgba(154, 208, 245, .2)',
                ],
                borderColor :'#098de7'
            }]
        },
        options: {
            spanGaps: false,
            elements: {
				line: {
					tension: 0.000001
				}
			},
            scales: {
            /* yAxes: [{
                    gridLines: {
                        color: 'transparent'
                    },
                    ticks: {
                        beginAtZero: false
                    },
                }],*/yAxes: [{
					stacked: true
				}],
                xAxes: [{
                    gridLines: {
                        color: 'transparent'
                    },
                    ticks: {
                        beginAtZero: false,
                    },
                }],
            },
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
				filler: {
					propagate: false
				},
				'samples-filler-analyser': {
					target: 'chart-analyser'
				}
			}
        }
    });
    }
    chart1();

    /*ENDING CHART*/
   
});