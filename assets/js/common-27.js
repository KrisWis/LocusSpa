function doPopupSubmit(form,yandex_id,yandex_goal){
	var required=form.find('[required="required"]');
	var error=false;
	$(required).each(function(){
		if($(this).val()==''){
			$(this).css('border-color','#e03c42');
			if(!error){
				$(this).focus();
			}
			error=true;
		}
		else{
			$(this).css('border-color','#cccccc');
		}
	});
	if(error){
		return false;
	}
	if(yandex_id!=''&&yandex_goal!=''){
		//window['yaCounter'+yandex_id].reachGoal(yandex_goal);
		ym(yandex_id,'reachGoal',yandex_goal);
		//ga('send','event','form',yandex_goal);
		//gtag('event',yandex_goal);
		//dataLayer.push({'event':yandex_goal});
	}
	$.ajax({
		url			:	form.attr('action'),
		type		:	form.attr('method'),
		processData	:	false,
		contentType	:	false,
		cache		:	false,
		data		:	new FormData(form[0]),
		beforeSend	:	function(){$.fancybox.showLoading();},
		success		:	function(r){
							$.fancybox({
								'content':r,
								beforeShow:function(){
									$("input[name=phone]").mask("+7 (999) 999-99-99");
									check_phone();
									//form_onsubmit();
								}
							});
							form.find('input[type=text]').val('');
							form.find('input[type=email]').val('');
							form.find('textarea').val('');
						},
		complete	:	function(){$.fancybox.hideLoading();}
	});
	return false;
}
function animate_picture(el,to){
	var image=el.offset();
	var cart=$(to).offset();
	var fly_el_attrs=' id="tmp_image" style="position:absolute;top:'+image.top+'px;left:'+image.left+'px;width:'+el.width()+'px;z-index:999;"';
	if(el.attr('src')){
		var fly_el='<img src="'+el.attr('src')+'"'+fly_el_attrs+'/>';
	}
	else{
		var fly_el='<i class="'+el.attr('class')+'"'+fly_el_attrs+'></i>';
	}
	$('footer').after(fly_el);
	params={
		top:cart.top+10+'px',
		left:cart.left+80+'px',
		opacity:0.1,
		width:20
	};
	$('#tmp_image').animate(params,900,false,function(){
		$('#tmp_image').remove();
	});
}
function setEqualHeight(columns){
	var tallestcolumn=0;
	columns.each(function(){
		currentHeight=$(this).height();
		if(currentHeight>tallestcolumn){
			tallestcolumn=currentHeight;
		}
	});
	columns.height(tallestcolumn);
}
function setEqualHeightBlock(columns,block){
	columns.each(function(){
		var tallestcolumn=0;
		var column=$(this);
		column.find(block).each(function(){
			currentHeight=$(this).height();
			if(currentHeight>tallestcolumn){
				tallestcolumn=currentHeight;
			}
		});
		column.find(block).height(tallestcolumn);
	});
}
function check_phone(){
	$('input[name=phone]').on('change',function(){
		if($(this).val().indexOf('+7 (89')!=-1){
			alert('Номер телефона указан неверно');
			$(this).css('border-color','#e03c42');
			$(this).val('');
		}
		else{
			$(this).css('border-color','#cccccc');
		}
	});
}
function form_onsubmit(){
	$('form').on('submit',function(){
		var required=$(this).find('[required="required"]');
		var error=false;
		$(required).each(function(){
			if($(this).val()==''){
				$(this).css('border-color','#e03c42');
				if(!error){
					$(this).focus();
				}
				error=true;
			}
			else{
				$(this).css('border-color','#cccccc');
			}
		});
		if(error){
			return false;
		}
		if($(this).hasClass('fp')){
			doPopupSubmit($(this),$(this).data('counter'),$(this).data('goal'));
			return false;
		}
	});
}
function canUseWebp(){
	let elem=document.createElement('canvas');
	if(!!(elem.getContext&&elem.getContext('2d'))){
		return elem.toDataURL('image/webp').indexOf('data:image/webp')==0;
	}
	return false;
}
window.onload=function(){
	let images=document.querySelectorAll('[data-bg]');
	for(let i=0;i<images.length;i++){
		let image=images[i].getAttribute('data-bg');
		images[i].style.backgroundImage='url('+image+')';
	}
	let isitFirefox=window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
	let firefoxVer=isitFirefox?parseInt(isitFirefox[1]):0;
	if(canUseWebp()||firefoxVer>=65){
		let imagesWebp=document.querySelectorAll('[data-bg-webp]');
		for(let i=0;i<imagesWebp.length;i++){
			let imageWebp=imagesWebp[i].getAttribute('data-bg-webp');
			imagesWebp[i].style.backgroundImage='url('+imageWebp+')';
		}
	}
};
$(window).load(function(){
	setEqualHeightBlock($(".catalog"),$(".item .photo"));
	setEqualHeightBlock($(".catalog"),$(".item .name"));
	setEqualHeight($(".razdels_4 .item"));
	setEqualHeight($(".lists_1 .item .photo"));
	setEqualHeight($(".lists_1 .item"));
	setEqualHeight($(".lists_6 .item"));
});
$.fn.setCursorPosition=function(pos){
	if($(this).get(0).setSelectionRange){
		$(this).get(0).setSelectionRange(pos,pos);
	}
	else if($(this).get(0).createTextRange){
		var range=$(this).get(0).createTextRange();
		range.collapse(true);
		range.moveEnd('character',pos);
		range.moveStart('character',pos);
		range.select();
	}
};
function set_mask_cursor(){
	$('input[name="phone"]').on('click',function(){
		$(this).setCursorPosition(4);
	});
	$('input[name="code"]').on('click',function(){
		$(this).setCursorPosition(0);
	});
}
$(document).ready(function(){
	$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.png'],a[href$='.gif']").fancybox({helpers:{title:{type:'over'}},padding:'0'});
	$('.popup').fancybox({
		helpers:{title:null},
		padding:'0',
		width:'800',
		beforeShow:function(){
			$("input[name=phone]").mask("+7 (999) 999-99-99");
			check_phone();
			form_onsubmit();
			set_mask_cursor();
		}
	});
	$("input[name=phone],input.phone").mask("+7 (999) 999-99-99");
	$("input[name=code]").mask("9999");
	set_mask_cursor();
	//$("select").not('.classic').selectBoxIt();
	$('.tabs .navigation ul li').on('click',function(){
		$(this).closest('.tabs').find('.navigation ul li,.contents .tab').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.tabs').find('.contents .tab[data-tab='+$(this).data('tab')+']').addClass('active');
	});
	$('.tabs .tabtitle').on('click',function(){
		$(this).toggleClass('active').find('i').toggleClass('fa-angle-up fa-angle-down');
		$(this).next().toggleClass('active');
	});
	$("#back_top").hide();
	$(window).scroll(function(){
		if($(this).scrollTop()>100){
			$('#back_top').fadeIn();
		}
		else{
			$('#back_top').fadeOut();
		}
	});
	$('#back_top a').click(function(){
		$('body,html').animate({
			scrollTop:0
		},800);
		return false;
	});
	form_onsubmit();
	$('.pricelist .name').on('click',function(){
		$(this).next('.data').slideToggle();
		$(this).find('i').toggleClass('fa-chevron-down fa-chevron-up');
		$(this).toggleClass('active');
	});
	$('.question.full').on('click',function(){
		$(this).toggleClass('active');
		$(this).find('i').toggleClass('fa-chevron-down fa-chevron-up');
		$(this).next('.answer').slideToggle();
	});
	$(".autocomplete").autocomplete({
		source:"/ajax.php?lang=def&page_type=search",
		minLength:4,
		position:{my:"right top",at:"right bottom"},
		select:function(event,ui){
			$(this).val(ui.item.value);
			$(this).parent('form').submit();
		}
	});
	$('.search i').on('click',function(){
		$(this).closest('form').submit();
	});
	$('.cookie_policy a').on('click',function(){
		$.ajax({
			url:'/ajax.php',
			type:'get',
			data:{cookie_policy_hide:1},
			success:function(response){
				$('.cookie_policy').remove();
			}
		});
	});
	$('a[href^="/#"]').on('click',function(){
		elementClick=$(this).attr("href").substring(1);
		if($(elementClick)!=undefined){
			destination=$(elementClick).offset().top;
			$('body,html').animate({scrollTop:destination},1100);
			return false;
		}
	});
	$('.starrr').each(function(){
		var el=$(this);
		$(el).starrr({
			rating:el.data('rating'),
			readOnly:el.data('readonly'),
			max:5,
			change:function(e,value){
				$.post('/index.php?ajax_action=rating',{item_id:el.data('id'),rate:value});
			}
		});
	});
	$('.wish_link').on('click',function(){
		var item_id=$(this).attr('data-id');
		var act=$(this).attr('data-action');
		$.ajax({
			type:'post',
			url:'/index.php?ajax_action=wish',
			data:{id:item_id,act:act},
			beforeSend:function(){
			},
			success:function(r){
				$('header .wish span').html(r);
			}
		});
		if($(this).attr('data-action')=='add'){
			$(this).attr('data-action','del');
			$(this).find('span').html('Убрать из закладок');
			$(this).addClass('active');
		}
		else if($(this).attr('data-action')=='del'){
			$(this).attr('data-action','add');
			$(this).find('span').html('Добавить в закладки');
			$(this).removeClass('active');
		}
		if($(this).data('detail')==1){
			picture=$('#detail_photo');
		}
		else{
			picture=$('.image_'+item_id);
		}
		animate_picture(picture,'header .wish');
		$(this).find('i').toggleClass('fa-heart fa-heart-o');
		return false;
	});
	check_phone();
	var count_pages=$('#more_pages').val();
	var more_url=$('#more_url').val();
	next_page=2;
	$('#more').on('click',function(){
		var vm=$('#vm').val();
		$.ajax({
			type:"GET",
			url:more_url+"page="+next_page+'&vm='+vm+'&ajax=1',
			cache:false,
			beforeSend:function(){$.fancybox.showLoading();},
			success:function(html){
				$(".catalog").append(html);
			},
			complete:function(){$.fancybox.hideLoading();}
		});
		next_page++;
		if(next_page>count_pages){
			$('#more').fadeOut("slow");
		}
	});
	$('.form .vars .check input').on('change',function(){
		$(this).closest('.vars').find('input').each(function(){
			var inp=$(this);
			var label=inp.closest('label');
			if(inp.is(":checked")){
				label.addClass('active');
			}
			else{
				label.removeClass('active');
			}
		});
	});
	$('.block_4 .block_announce a').on('click',function(){
		$('.block_4').hide();
		$('.block_5').show();
		return false;
	});
	$('.block_5 .block_announce a').on('click',function(){
		$('.block_5').hide();
		$('.block_4').show();
		return false;
	});
	$('.adult_modal .no').on('click',function(){
		window.close();
		$('body').html('');
		return false;
	});
	/*
	$('.grid').masonry({
		itemSelector:'.item',
	});
	*/
});
