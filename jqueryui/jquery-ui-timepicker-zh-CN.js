/* Simplified Chinese translation for the jQuery Timepicker Addon /
/ Written by Will Lu */
(function ($) {
	$.timepicker.regional['zh-CN'] = {
		changeMonth: true,
		changeYear: true,
		showSecond: false, //显示秒 
		clearText: '清除',
		clearStatus: '清除已选日期',
		closeStatus: '不改变当前选择',
		prevText: '<上月',
		prevStatus: '显示上月',
		prevBigText: '<<',
		prevBigStatus: '显示上一年',
		nextText: '下月>',
		nextStatus: '显示下月',
		nextBigText: '>>',
		nextBigStatus: '显示下一年',
		currentText: '现在',
		currentStatus: '显示本月',
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		monthStatus: '选择月份',
		yearStatus: '选择年份',
		weekHeader: '周',
		weekStatus: '年内周次',
		dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
		dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
		dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
		dayStatus: '设置 DD 为一周起始',
		dateStatus: '选择 m月 d日, DD',
		dateFormat: 'yy-mm-dd',
		timeFormat: 'HH:mm:ss',
		timeText: '时间',
		hourText: '小时',
		minuteText: '分钟',
		secondText: '秒',
		closeText: '完成',
		firstDay: 1,
		initStatus: '请选择日期',
		isRTL: false
	};
	$.timepicker.setDefaults($.timepicker.regional['zh-CN']);
})(jQuery);