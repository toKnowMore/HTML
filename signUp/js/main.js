$(function () {

  'use strict';

  var $distpicker = $('#distpicker');

  $distpicker.distpicker({
    province: '浙江省',
    city: '杭州市',
    district: '下城区'
  });

  $('#reset').click(function () {
    $distpicker.distpicker('reset');
  });

  $('#reset-deep').click(function () {
    $distpicker.distpicker('reset', true);
  });

  $('#destroy').click(function () {
    $distpicker.distpicker('destroy');
  });

  $('#distpicker1').distpicker();



});
