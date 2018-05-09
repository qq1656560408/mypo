package com.mz.mapper;

import com.mz.entity.ForestPhyQuantityTable;
import com.mz.vo.ShowForestPhyQuantity;

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
public interface ForestPhyQuantityTableMapper extends BaseMapper<ForestPhyQuantityTable> {

	/**
	 * 批量新增excel
	 * @param forest
	 */
	void insertPhyQuantityExcel(@Param("list")List<ForestPhyQuantityTable> forest);
	
	/**
	 * 分页
	 * @param begin
	 * @param size
	 * @return
	 */
	List<ShowForestPhyQuantity> selectPhyQuantityLimit(@Param("begin")int begin,@Param("size")int size);

	/**
	 * 修改实物量
	 * @param mpqt
	 */
	int updatePhyQuantity(@Param("forest")ForestPhyQuantityTable forest);

	/**
	 * 根据id删除
	 * @param id
	 */
	int deleteByID(@Param("id")int id);

	/**
	 * 新增数据
	 * @param mpqt
	 */
	void insertPhyQuantity(@Param("forest")ForestPhyQuantityTable forest);

	/**
	 * 根据id查询
	 * @param id
	 * @return
	 */
	ShowForestPhyQuantity selectByID(@Param("id")int id);
}