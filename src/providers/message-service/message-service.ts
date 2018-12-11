import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Globals } from '../../app/Globals';

@Injectable()
export class MessageServiceProvider {

  globals: Globals;

  constructor(public http: Http) {
    this.globals = Globals.getInstance();
  }

  /*getMessages() {
    this.http.get(this.url).subscribe(data => {console.log(data)});
  }*/

  httpGetRequest(url: string) {
    return this.http.get(url)
      .map(res => res.json());
  }

  httpPostRequest(url: string, data: string) {
    return this.http.post(url, data)
      .map(res => res.json());
  }

  login(value: { uname: string, pswd: string }) {
    var url = this.globals.getUrl() + "login";
    var data = JSON.stringify({ sso_id: value.uname });
    return this.httpPostRequest(url, data);
  }

  notifCount(sso_id: string) {
    var url = this.globals.getUrl() + "alerts";
    var data = JSON.stringify({ sso_id: sso_id });
    return this.httpPostRequest(url, data).subscribe(data => {
      this.globals.setNotifCount(data.alert_count);
    });
  }

  notifDetails(sso_id: string) {
    var url = this.globals.getUrl() + "alerts_list";
    var data = JSON.stringify({ sso_id: sso_id });

    return this.httpPostRequest(url, data);
  }

  shipmentRequest(sso_id: string) {
    // var url = this.globals.getUrl() + "shipment";
    var url = "assets/shipment_request.json";
    return this.httpGetRequest(url);
  }

  feMyOrderList(sso_id: string) {
    var url = this.globals.getUrl() + "open_orderM";
    var data = JSON.stringify({ sso_id: sso_id })
    console.log(data);
    return this.httpPostRequest(url, data);
  }

  dueInReturn(sso_id: string) {
    var url = this.globals.getUrl() + "crossed_return_date_ordersM";
    var data = JSON.stringify({ sso_id: sso_id })
    console.log(data);
    return this.httpPostRequest(url, data);
  }

  dueInDelivery(sso_id: string) {
    var url = this.globals.getUrl() + "crossed_expected_delivery_dateM";
    var data = JSON.stringify({ sso_id: sso_id })
    console.log(data);
    return this.httpPostRequest(url, data);
  }



  adminNotification(sso_id: string, alertType: string) {
    console.log("inisde admin notification");
    var url = "";
    if (alertType == "5") {
      url = "assets/due_tool_return.json";
    } else if (alertType == "6") {
      url = "assets/due_deliveries.json";
    }
    console.log(this.httpGetRequest(url));
    return this.httpGetRequest(url);
  }

  getToolsList(sso_id: string, query: string, segment: number) {
    console.log("segement ");
    var url = this.globals.getUrl() + "search_tools";
    var data = JSON.stringify({ sso_id: sso_id, search_tools: query, segment: segment })
    console.log(data);
    return this.httpPostRequest(url, data);
  }

  confirmTools(jsonData) {
    var url = this.globals.getUrl() + "confirm_tools";
    return this.httpPostRequest(url, jsonData);
  }

  orderTools(jsonData) {
    var url = this.globals.getUrl() + "submit_order";
    return this.httpPostRequest(url, jsonData);
  }

  getCustomerAvailability(custId) {
    var url = this.globals.getUrl() + "chackSystemIDAvailability";
    var jsonData = JSON.stringify({ system_id: custId });
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }

  getCustomerList() {
    var url = "assets/customer.json";
    return this.httpGetRequest(url);
  }

  getWarehouseDet() {
    var url = "assets/warehouse.json";
    return this.httpGetRequest(url);
  }

  getOrderIdAvailability(orderNum) {
    var url = this.globals.getUrl() + "check_order_number_availability";
    var jsonData = JSON.stringify({ order_number: orderNum });
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }

  getCustomerAddress(custId) {
    var url = this.globals.getUrl() + "getAddressByID";
    var jsonData = JSON.stringify({ system_id: custId });
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }

  getWarehouseAddress(wareHouseId) {
    var url = this.globals.getUrl() + "getWarehouseAddress";
    var jsonData = JSON.stringify({ fe_to_wh_id: wareHouseId });
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }

  getAcknowledgmentRequest(ssoId, alertType) {
    console.log("alertType ==> " + alertType);
    var url = this.globals.getUrl() + "receive_orderM";
    var jsonData = JSON.stringify({ sso_id: ssoId, alert_type: alertType });
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }

  acknowledgeRequestAddressForWHAlert(ssoId,alertType, toolOrderId){
    var url = this.globals.getUrl() + "ack_address";
    var jsonData = JSON.stringify({sso_id: ssoId,alert_type:alertType,tool_order_id:toolOrderId});
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }
  

  acknowledgeRequestAddressForFEAlert(alertType,rtoID,ssoId){
    var url = this.globals.getUrl() + "ack_address";
    var jsonData = JSON.stringify({alert_type:alertType,rto_id:rtoID,sso_id:ssoId});
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }



  getAckRequest(rtoID, jsonObj) {
    console.log("inside getAck request");
    var url = this.globals.getUrl() + "insert_fe2_fe_receiveM";
    if (rtoID == null) {
      url = this.globals.getUrl() + "insert_fe_received_orderM";
    }
    var jsonData: string = JSON.stringify(jsonObj);
    console.log(rtoID);
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }

  getExtendDateData(ssoId) {
    var url = this.globals.getUrl() + "exceededOrderDurationM";
    var jsonData = JSON.stringify({ sso_id: ssoId });
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }

  extendDateApproval(jsonData) {
    var url = this.globals.getUrl() + "submitexceededOrderDurationM";
    return this.httpPostRequest(url, jsonData);
  }

  addressChange(ssoId) {
    var url = this.globals.getUrl() + "address_changeM";
    var jsonData = JSON.stringify({ sso_id: ssoId });
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }

  getReturnTools(ssoId, alertType) {
    var url = this.globals.getUrl() + "raise_pickupM";
    var jsonData = JSON.stringify({ sso_id: ssoId, alert_type: alertType });
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }

  getReturnToolInitialize(ssoId, toolOrderId) {
    var url = this.globals.getUrl() + "owned_order_detailsM";
    var jsonData = JSON.stringify({ tool_order_id: toolOrderId, sso_id: ssoId });
    return this.httpPostRequest(url, jsonData);
  }

  getAcknowlegeToolInitialize(ssoId, toolOrderId,rtoId) {
    console.log("Inside get Acknowledge Tool Intitialize rtoId=>"+rtoId);
    var url = this.globals.getUrl() + "receive_order_detailsM";
    var jsonData = JSON.stringify({ tool_order_id: toolOrderId, sso_id: ssoId });
    if(rtoId != null){
      url = this.globals.getUrl() + "fe2_fe_receive_detailsM";
      jsonData = JSON.stringify({rto_id:rtoId,sso_id:ssoId});
    }
    return this.httpPostRequest(url, jsonData);
  }



  addressUpdate(jsonData, addressUrl) {
    var url = this.globals.getUrl() + addressUrl;
    console.log(url);
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }

  stockTransferList(ssoId) {
    var url = this.globals.getUrl() + "raiseSTforOrderM";
    var jsonData = JSON.stringify({ sso_id: ssoId });
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }

  refreshForStockTransferOrder(sso_id, tool_id) {
    var url = this.globals.getUrl() + "checkToolsAvailabilityAgainM";
    console.log("sso_id=>" + sso_id + " and tool_id=>" + tool_id);
    var jsonData = JSON.stringify({ tool_order_id: tool_id, sso_id: sso_id });
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }



  stockOrderDetForOrders(ssoId: string, toolOrderId: string) {
    var url = this.globals.getUrl() + "assignSTtoolsForOrderM";
    var jsonData = JSON.stringify({ tool_order_id: toolOrderId, sso_id: ssoId });
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }

  stockWHToWH(ssoId: string, toolOrderId: string) {
    var url = this.globals.getUrl() + "approveOrRejectSTM";
    var jsonData = JSON.stringify({ tool_order_id: toolOrderId, sso_id: ssoId });
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }

  stockTransferWHToWHPost(data) {
    console.log("stock transfer wh ");
    console.log(data);
    var url = this.globals.getUrl() + "submitApproveOrRejectSTM";
    return this.httpPostRequest(url, data);
  }



  stockTransfersForOrdersPost(data) {
    var url = this.globals.getUrl() + "insertAssignedSTtoolsM";
    var jsonData = JSON.stringify(data);
    console.log("************");
    console.log(jsonData);
    console.log("************");
    return this.httpPostRequest(url, jsonData);
  }

  returnToolRequest(data) {
    var url = this.globals.getUrl() + "insert_fe_owned_orderM";
    var jsonData = JSON.stringify(data);
    console.log("************");
    console.log(jsonData);
    console.log("************");
    return this.httpPostRequest(url, jsonData);

  }

  acknowledgeRequestValue(data,rtoId) {
    console.log("***rto**************");
    console.log(rtoId);
    console.log("***rto**************");
    var url = this.globals.getUrl() + "insert_fe_received_orderM";
    if(rtoId != null){
      //for fe posting
      url = this.globals.getUrl() + "insert_fe2_fe_receiveM";
    }
    var jsonData = JSON.stringify(data);
    console.log("************");
    console.log(jsonData);
    console.log("************");
    return this.httpPostRequest(url, jsonData);
  }






  feToFeTransfer(ssoId: string) {
    var url = this.globals.getUrl() + "fe2_fe_approvalM";
    var jsonData = JSON.stringify({ sso_id: ssoId });
    console.log(jsonData);
    return this.httpPostRequest(url, jsonData);
  }

  feToFeTransferPost(data) {
    console.log("Before parsing");
    console.log(data);
    var url = this.globals.getUrl() + "insert_fe2_fe_approvalM";
    return this.httpPostRequest(url, data);
  }

  getPendingLogisticsAlertRequest(jsonData, alertType) {
    var url = this.globals.getUrl() + "shipment_req_list";
    console.log(alertType);
    console.log(jsonData + " " + url);
    return this.httpPostRequest(url, jsonData);
  }

  extendDate(jsonData) {
    var url = this.globals.getUrl() + "submitDaysExtensionRequestM";
    console.log(jsonData + " " + url);
    return this.httpPostRequest(url, jsonData);
  }
}
