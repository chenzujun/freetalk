package com.raine.freetalk.domain;


import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 *  保留原因：xml数据库映射中有用到
 *
 */
public class Ognl {
    private Ognl() {
    }

    public static boolean isEmpty(Object o) throws IllegalArgumentException {
        if (o == null) {
            return true;
        }
        if (o instanceof CharSequence) {
            return ((CharSequence) o).length() == 0;
        }
        if (o instanceof Collection) {
            return ((Collection) o).isEmpty();
        }
        if (o instanceof Map) {
            return ((Map) o).isEmpty();
        }
        if (o instanceof Object[]) {
            Object[] object = (Object[]) o;
            if(object.length == 0){
                return true;
            }
            boolean empty = true;
            for (int i=0;i<object.length;i++){
                if(!isEmpty(object[i])){
                    empty = false;
                    break;
                }
            }
            return empty;
        }
        return false;
    }

    public static boolean isNotEmpty(Object o) {
        return !isEmpty(o);
    }

    public static boolean isNotBlank(Object o) {
        return !isBlank(o);
    }

    public static boolean isNumber(Object o) {
        if (o == null) {
            return false;
        }
        if (o instanceof Number) {
            return true;
        }
        if (o instanceof String) {
            String str = (String) o;
            return str.length() == 0 ? false : (str.trim().length() == 0 ? false : StringUtils.isNumeric(str));
        } else {
            return false;
        }
    }

    public static boolean isBlank(Object o) {
        if (o == null) {
            return true;
        }
        if (o instanceof String) {
            String str = (String) o;
            return isBlank(str);
        } else {
            return false;
        }
    }

    public static boolean isBlank(String str) {
        if (str != null && str.length() != 0) {
            for (int i = 0; i < str.length(); ++i) {
                if (!Character.isWhitespace(str.charAt(i))) {
                    return false;
                }
            }

            return true;
        } else {
            return true;
        }
    }

    public static boolean isNeedTenantId(Integer tenantId) {
        return tenantId == null ? false : tenantId.intValue() >= -1;
    }

    public static void main(String[] args) {
        System.out.println(Ognl.isEmpty(""));
        System.out.println(Ognl.isEmpty(" "));
        System.out.println(Ognl.isEmpty(null));
        System.out.println(Ognl.isEmpty(new ArrayList<>()));
        System.out.println(Ognl.isEmpty(new HashMap<>(2)));
    }
}

