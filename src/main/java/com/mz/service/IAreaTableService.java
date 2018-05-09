package com.mz.service;

import com.mz.entity.AreaTable;

import java.util.List;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
public interface IAreaTableService extends IService<AreaTable> {
	  List<AreaTable> selectAreaMessages(Integer areaID);
}
