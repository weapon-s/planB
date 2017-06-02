package com.sinosoft.planb.vo;

/**
 * Created by weapon on 2017/05/25.
 */
public class Vo {
    private Integer code;
    private Object data;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public static Vo succ(Object data){
        Vo vo = new Vo();
        vo.setCode(200);
        vo.setData(data);
        return vo;
    }

    public static Vo succ(){
        return succ("操作成功");
    }

    public static Vo fail(Object data){
        Vo vo = new Vo();
        vo.setCode(400);
        vo.setData(data);
        return vo;
    }
}
