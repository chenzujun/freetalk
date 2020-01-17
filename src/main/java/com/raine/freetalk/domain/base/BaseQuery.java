package com.raine.freetalk.domain.base;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * @author chenjun
 * @date 2020/1/16
 * @since V1.0.0
 */
public class BaseQuery implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer id;
    private String sort;
    private Integer start;
    private Integer end;
    private Integer pageNo;
    private Integer pageSize;
    private Map<String, String> mapSort;
    private String dialect;
    private String keyName;
    /**
     * 是否分页查询 默认分页
     */
    private boolean paging = false;

    public BaseQuery() {
    }

    public BaseQuery(BaseQuery query) {
        this.start = Integer.valueOf(0);
        this.end = Integer.valueOf(10000);
        this.pageNo = Integer.valueOf(1);
        this.pageSize = 10;
        this.mapSort = new HashMap();
        this.dialect = "mysql";
        if (query != null) {
            this.id = query.id;
            this.sort = query.sort;
            this.start = query.start;
            this.end = query.end;
            this.pageNo = query.pageNo;
            this.pageSize = query.pageSize;
            this.mapSort = query.mapSort;
        }

    }

    public String getKeyName() {
        return keyName;
    }

    public void setKeyName(String keyName) {
        this.keyName = keyName;
    }

    public boolean isPaging() {
        return paging;
    }

    public void setPaging(boolean paging) {
        this.paging = paging;
    }

    private boolean checkBound(Integer i) {
        return i.intValue() >= 0 && i.intValue() <= 2147483647;
    }

    public Integer getStart() {
        return this.start;
    }

    public void setStart(Integer start) {
        if (this.checkBound(start)) {
            this.start = start;
        }

    }

    public Integer getEnd() {
        return this.end;
    }

    public void setEnd(Integer end) {
        if (this.checkBound(end)) {
            this.end = end;
        }

    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSort() {
        return this.sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public Integer getPageNo() {
        return this.pageNo;
    }

    public void setPageNo(Integer pageNo) {
        this.pageNo = pageNo;
    }

    public Integer getPageSize() {
        return this.pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Map<String, String> getMapSort() {
        if (null != this.sort && this.sort != "") {
            String[] temp = this.sort.split(" ");
            this.mapSort.put(temp[0], temp[1]);
        }
        return this.mapSort;
    }

    public void setMapSort(Map<String, String> mapSort) {
        this.mapSort = mapSort;
    }

    public String getDialect() {
        return this.dialect;
    }

    public void setDialect(String dialect) {
        this.dialect = dialect;
    }


}