package com.mz.mapper;

import com.mz.entity.LandPhyQuantityTable;
import com.mz.vo.ShowLangPhyQuantity;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author 
 * @since 2018-04-21
 */
public interface LandPhyQuantityTableMapper extends BaseMapper<LandPhyQuantityTable> {

	/**
	 * 批量新增excel
	 * @param lang
	 */
	void insertPhyQuantityExcel(@Param("list")List<LandPhyQuantityTable> lang);
	
	/**
	 * 分页
	 * @param begin
	 * @param size
	 * @return
	 */
	List<ShowLangPhyQuantity> selectPhyQuantityLimit(@Param("begin")int begin,@Param("size")int size);

	/**
	 * 修改实物量
	 * @param mpqt
	 */
	int updatePhyQuantity(@Param("lang")LandPhyQuantityTable lang);

	/**
	 * 根据id删除
	 * @param id
	 */
	int deleteByID(@Param("id")int id);

	/**
	 * 新增数据
	 * @param mpqt
	 */
	void insertPhyQuantity(@Param("lang")LandPhyQuantityTable lang);

	/**
	 * 根据id查询
	 * @param id
	 * @return
	 */
	ShowLangPhyQuantity selectByID(@Param("id")int id);
	
	
}