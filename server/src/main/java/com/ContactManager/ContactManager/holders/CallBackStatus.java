package com.ContactManager.ContactManager.holders;

public class CallBackStatus {

    private int status;
    private String msg;


    public CallBackStatus(int status, String msg) {
        this.status = status;
        this.msg = msg;
    }

    public CallBackStatus() {
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    @Override
    public String toString() {
        return "CallBackStatus{" +
                "status=" + status +
                ", msg='" + msg + '\'' +
                '}';
    }
}
