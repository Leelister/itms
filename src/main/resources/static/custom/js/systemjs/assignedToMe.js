/*
 * Copyright (c) 2017. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan. 
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna. 
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus. 
 * Vestibulum commodo. Ut rhoncus gravida arcu. 
 */

/**
 * Created by Lister on 2017/8/10.
 */
var isLoadCommentsTable = false;
function initMySelect() {
    // 获取产品列表
    $.post("/testCase/getAllProduct.bms",{projectId:localStorage.getItem("stotage_project_id")},function (data) {
        initmyselect($("#productName"),data);
    },"json");
}


function showQuestionOper(id) {
    $("#questionOperLogDiv").children().remove();
    $.post("/question/questionOperaList.bms",{questionId:id},function (data) {
        if (data.length != 0){
            for (var i = 0; i < data.length; i++) {
                var value = data[i];
                var html = "";
                if (i%2==0) {
                    html = '<div class="item" style="padding: 10px;margin: 0px;">';

                } else {
                    html = '<div class="item" style="background: #eeeeee;padding: 10px;margin: 0px;">';

                }
                html+= '<img src="'+value.col2+'" alt="user image">'+
                    '   <p class="message">'+
                    '   <a href="javascript:void(0)" class="name"> '+
                    '   <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> '+formatDate(new Date(value.operaTime))+'</small>  ' +
                    value.col1+
                    '</a>'+
                    value.operaContext+
                    '</p>  '+
                    '</div>';
                $("#questionOperLogDiv").append(html);
            }
        } else {
            $("#questionOperLogDiv").append('<div class="col-xs-12 text-center" style="font-size: 20px;color: #a5a5a5;margin-top: 200px;margin-bottom: 200px;">暂无记录</div>');
        }
    },"json");
}


function showCommentsTable(id) {
        $("#questionCommentTable").children().remove();
        $.post("/comments/list.bms",{questionId:id},function (data) {
            if (data.length != 0){
                for (var i = 0; i < data.length; i++) {
                    var value = data[i];
                    var html = "";
                    if (i%2==0) {
                        html = '<div class="item" style="padding: 10px;margin: 0px;">';

                    } else {
                        html = '<div class="item" style="background: #eeeeee;padding: 10px;margin: 0px;">';

                    }
                    html+= '<img src="'+value.userImage+'" alt="user image">'+
                        '   <p class="message">'+
                        '   <a href="javascript:void(0)" class="name"> '+
                        '   <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> '+formatDate(new Date(value.createTime))+'</small>  ' +
                        value.userName+
                        '</a>'+
                        value.comment+
                        '</p>  '+
                        '</div>';
                    $("#questionCommentTable").append(html);
                }
            } else {
                $("#questionCommentTable").append('<div class="col-xs-12 text-center" style="font-size: 20px;color: #a5a5a5;margin-top: 200px;margin-bottom: 200px;">暂无记录</div>');
            }
        },"json");
}
// 修改状态
function updateQuestionStatus(status) {
    var questionId = $("#questionId").text();
    $.post("/question/updQuestionStatus.bms",{
        questionStatus:status,
        id:questionId
    },function (data) {
        if (data.code == "0000") {
            toastrsuccess(data.msg);
            $.post("/question/get.bms",{id:questionId},function (data) {
                setRightWindowValue(data.data);
            },"json");
        } else {
            toastrerror(data.msg);
        }
    },"json");
    showQuestionOper(questionId);
}
function setRightWindowValue(row) {
    $("#projectNameForQue").text(row.projectName);
    $("#productNameForQue").text(row.productName);
    $("#versionNameForQue").text(row.versionName);
    $("#questionTitleForQue").text(row.questionTitle);
    $("#questionId").text(row.id);
    if (row.questionLevel == 1) {
        $("#questionLevelText").html('<span class="badge bg-red">L1</span>');
    } else if (row.questionLevel == 2) {
        $("#questionLevelText").html('<span class="badge bg-yellow">L2</span>');
    } else if (row.questionLevel == 3) {
        $("#questionLevelText").html('<span class="badge bg-aqua">L3</span>');
    } else if (row.questionLevel == 4) {
        $("#questionLevelText").html('<span class="badge bg-green">L4</span>');
    }
    $("#questionLevelValueForQue").val(row.questionLevel);
    if (row.questionStatus == 1) {
        $("#questionStatus").html('<span class="badge bg-yellow">未解决</span>');
    } else if (row.questionStatus == 2) {
        $("#questionStatus").html('<span class="badge bg-blue">待验证</span>');
    } else if (row.questionStatus == 3) {
        $("#questionStatus").html('<span class="badge bg-green">已解决</span>');
    } else if (row.questionStatus == 4) {
        $("#questionStatus").html('<span class="badge bg-aqua">已挂起</span>');
    } else if (row.questionStatus == 5) {
        $("#questionStatus").html('<span class="badge bg-red">拒绝</span>');
    } else if (row.questionStatus == 6) {
        $("#questionStatus").html('<span class="badge bg-info">已关闭</span>');
    }
    if (row.questionType == 1) {
        $("#questionTypeForQue").text("需求");
    } else if (row.questionType == 2) {
        $("#questionTypeForQue").text("缺陷");
    }
    $("#questionTypeValyeForQue").val(row.questionType);
    if (row.questionStage == 1) {
        $("#questionStageTextForQue").html('<span class="badge bg-green">冒烟</span>');
    } else if (row.questionStage == 2) {
        $("#questionStageTextForQue").html('<span class="badge bg-info">集成</span>');
    } else if (row.questionStage == 3) {
        $("#questionStageTextForQue").html('<span class="badge bg-blue-active">验收</span>');
    } else if (row.questionStage == 4) {
        $("#questionStageTextForQue").html('<span class="badge bg-yellow">回归</span>');
    }
    $("#questionStageValueForQue").val(row.questionStage);
    $("#createByForQue").text(localStorage.getItem("userid-"+row.submitUserId));
    $("#updateByForQue").text(localStorage.getItem("userid-"+row.dealUserId));
    $("#startPlanDateForQue").text(formatDate(new Date(row.planStartTime)));
    $("#endPlanDateForQue").text(formatDate(new Date(row.planEndTime)));

    $("#createDateForQue").text(formatDate(new Date(row.createTime)));
    $("#updateDateForQue").text(formatDate(new Date(row.updateTime)));

    $("#questionDesc").html(row.questionDesc);
    // 控制按钮显示隐藏       
    $("#btnCloseQuestion").hide();
    $("#btnYanzheng").hide();
    $("#btnJujue").hide();
    $("#btnZhipai").hide();
    $("#btnXiufu").hide();
    $("#btnGuaqi").hide();
    $("#btnJujue").hide();
    $("#btnReOpen").hide();
    if (row.questionStatus == 1) {
        $("#btnXiufu").show();
        $("#btnGuaqi").show();
        $("#btnJujue").show();
        $("#btnZhipai").show();
    }

    if (row.questionStatus == 2) {
        if (row.submitUserId == $("#sessionUserId").val()) {
            $("#btnCloseQuestion").show();
        }
        $("#btnReOpen").show();
    }
    if (row.questionStatus == 3) {
        $("#btnYanzheng").show();
    }
    if (row.questionStatus == 4) {
        $("#btnReOpen").show();
    }
    if (row.questionStatus == 5) {
        $("#btnReOpen").show();
    }
    if (row.questionStatus == 6) {
        $("#btnReOpen").show();
    }
    showCommentsTable(row.id);
    showQuestionOper(row.id);
}

function serchQuestionTable() {
    var productName =  $("#productName").attr("data-value");
//            var questionStatus = $("#statusName").attr("data-value");
    var questionLevel = $("#youxianji").attr("data-value");
    var questionStage = $("#questionStageSelect").attr("data-value");
    var questionType = $("#questionTypeSelect").attr("data-value");
    var param = {productId:productName,questionType:questionType,questionLevel:questionLevel,questionStage:questionStage};
    $('#questionTable').bootstrapTable('refresh',{query:param});
}
$(function () {
    $("#btnEditForRightWindow").hide();
    initMySelect();
    $('#reservation').daterangepicker();
    $(".select2").select2();
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
    });
    var isOpen = false;
    $(document).on("click",".myliitem",function(){
        serchQuestionTable();
    });
    // 加载用户
    $.post("/user/getAllUser.bms","",function (data) {
        var datas = [];
        var i = 0;
        $.each(data, function (n, value) {
            datas[i] ={ id: value.id, text: value.name }
            i++;
        });
        $("#zhipaiWindowUser").select2({
            data: datas,
        });
    },"json");
    $('#edit').editable({
        inlineMode: false, alwaysBlank: true,
        language: "zh_cn",
        height: '400px',
        imageUploadURL: '/image/uploadFroala.bms',//上传到本地服务器
        imageUploadParams: {id: "edit"}
    });

    $('#questionTable').bootstrapTable({
        url: '/question/assignedToMe.bms?projectId='+localStorage.getItem("stotage_project_id"),
        singleSelect:true,//只能单选
        clickToSelect:true,
        paginationVAlign:'top',
        paginationHAlign:'left',
        paginationDetailHAlign:'right',
        pagination: true,     //是否显示分页（*）
        sortable: false,      //是否启用排序
        sortOrder: "asc",     //排序方式
        pageNumber:1,      //初始化加载第一页，默认第一页
        pageSize: 10,
        contentType: "application/x-www-form-urlencoded",
        queryParamsType:'', //默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
        // 设置为 ''  在这种情况下传给服务器的参数为：pageSize,pageNumber
        queryParams:function(params) {
            var productName =  $("#productName").attr("data-value");
            var questionLevel = $("#youxianji").attr("data-value");
            var questionStage = $("#questionStageSelect").attr("data-value");
            var questionType = $("#questionTypeSelect").attr("data-value");
            var param = {};
            param = {productId:productName,questionType:questionType,questionLevel:questionLevel,questionStage:questionStage,pageSize: params.pageSize, pageNumber: params.pageNumber};
            return param;
        },
        sidePagination: "server",   //分页方式：client客户端分页，server服务端分页（*）
        //search: true,      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        columns: [
            {field: 'id', title: '编号', width:50, align: 'left'},
            {field: 'questionTitle', title: '标题',  align: 'left'},
            {field: 'productName',title: '产品', align: 'left'},
            {field: 'questionType', title: '类型',  align: 'center',
                formatter: function (value, row, index) {
                    if (value == 1) {
                        return '<span class="badge bg-green">需求</span>';
                    } else if (value == 2) {
                        return '<span class="badge bg-green-active">缺陷</span>';
                    }
                }
            },
            {
                field: 'questionStatus', title: '状态',width:80, align: 'center',
                formatter: function (value, row, index) {
                    if (value == 1) {
                        return '<span class="badge bg-yellow">未解决</span>';
                    } else if (value == 2) {
                        return '<span class="badge bg-blue">待验证</span>';
                    } else if (value == 3) {
                        return '<span class="badge bg-green">已解决</span>';
                    } else if (value == 4) {
                        return '<span class="badge bg-aqua">已挂起</span>';
                    } else if (value == 5) {
                        return '<span class="badge bg-red">拒绝</span>';
                    } else if (value == 6) {
                        return '<span class="badge bg-info">已关闭</span>';
                    }
                }
            },
            {
                field: 'questionLevel', title: '优先级',width:80, align: 'center',
                formatter: function (value, row, index) {
                    if (value == 1) {
                        return '<span class="badge bg-red">L1</span>';
                    } else if (value == 2) {
                        return '<span class="badge bg-yellow">L2</span>';
                    } else if (value == 3) {
                        return '<span class="badge bg-aqua">L3</span>';
                    } else if (value == 4) {
                        return '<span class="badge bg-green">L4</span>';
                    }
                }
            },
            {
                field: 'questionStage', title: '阶段', width:60, align: 'center',
                formatter: function (value, row, index) {
                    if (value == 1) {
                        return '<span class="badge bg-green">冒烟</span>';
                    } else if (value == 2) {
                        return '<span class="badge bg-info">集成</span>';
                    } else if (value == 3) {
                        return '<span class="badge bg-blue-active">验收</span>';
                    } else if (value == 4) {
                        return '<span class="badge bg-yellow">回归</span>';
                    }
                }
            },
            {
                field: 'submitUserId',title: '提交人',width:70, align: 'left',
                formatter: function(value,row,index) {
                    return localStorage.getItem("userid-"+value);
                }
            }
        ], onClickRow(row, $element) {
            $.post("/question/get.bms",{id:row.id},function (data) {
                setRightWindowValue(data.data);
            },"json");
            isOpen = false;
            $(".right_window").show();
            $(".right_window").animate({width: "600px"});
            setTimeout(function () {
                isOpen = true;
            }, 1000);
        }
    });

    $(".closeRightWindowDiv").click(function () {
        if (isOpen) {
            $(".right_window").animate({width: "0px"},0);
            $(".right_window").hide(0);
        }
        isOpen = false;
    });

    // 保存指派
    $("#btnSaveZhipai").click(function (data) {
        var questionId = $("#questionId").text();
        var userId = $("#zhipaiWindowUser").select2("data")[0].id;
        $.post("/question/zhipai.bms",{id:questionId,dealUserId:userId},function (data) {
            toastrinfo(data.msg);
            $.post("/question/get.bms",{id:questionId},function (data) {
                setRightWindowValue(data.data);
                $("#zhipaiWindow").modal('hide');
            },"json");
        },"json");
    });
    // 打开评论窗口
    $("#btnPinglun").click(function () {
        $("#pinglunWindow").modal('show');
    });
    $("#btnZhipai").click(function () {
        $('#zhipaiWindowUser').select2("val", [$("#updateByForQue").text()]);
        $("#zhipaiWindow").modal('show');
    });
    // 修复
    $("#btnXiufu").click(function () {
        updateQuestionStatus(3);
        serchQuestionTable();
    });
    // 关闭
    $("#btnCloseQuestion").click(function () {
        updateQuestionStatus(6);
        serchQuestionTable();
    });
    // 挂起
    $("#btnGuaqi").click(function () {
        updateQuestionStatus(4);
        serchQuestionTable();
    });
    // 拒绝
    $("#btnJujue").click(function () {
        updateQuestionStatus(5);
        serchQuestionTable();
    });
    // 验证
    $("#btnYanzheng").click(function () {
        updateQuestionStatus(2);
        serchQuestionTable();
    });
    // 重新打开
    $("#btnReOpen").click(function () {
        updateQuestionStatus(1);
        serchQuestionTable();
    });
    // 保存屏幕内容
    $("#savePinglun").click(function () {
        var context = $("#pingLunContext").val();
        var questionId = $("#questionId").text();
        if (context == "") {
            toastrwarning("请输入评论内容");
            return;
        }
        $.post("/comments/create.bms",{
            comment:context,
            questionId:questionId
        },function (data) {
            if (data.code == "0000") {
                toastrsuccess(data.msg);
                $("#pingLunContext").val("");
                showCommentsTable(questionId);
                showQuestionOper(questionId);
            } else {
                toastrerror(data.msg);
            }
            $("#pinglunWindow").modal('hide');
        },"json");
    });
});
