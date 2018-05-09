package com.mz.mapper;

import com.mz.entity.MinePhyQuantityTable;
import com.mz.vo.ShowMinePhyQuantity;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author 
 * @since 2018-04-19
 */
public interface MinePhyQuantityTableMapper extends BaseMapper<MinePhyQuantityTable> {

	/**
	 * 
	 * @param waterTypeAndFeaturesID  类别功能id
	 * @return
	 */
	MinePhyQuantityTable selectPhyQuantity(@Param("typeAndFeaturesID")int typeAndFeaturesID);

	/**
	 * excel批量插入
	 * @param list
	 */
	void insertPhyQuantityExcel(@Param("list") List<MinePhyQuantityTable> list);


	/**
	 * 分页
	 * @param begin
	 * @param size
	 * @return
	 */
	List<ShowMinePhyQuantity> selectPhyQuantityLimit(@Param("begin")int begin,@Param("size")int size);

	/**
	 * 修改实物量
	 * @param mpqt
	 */
	int updatePhyQuantity(@Param("mpqt")MinePhyQuantityTable mpqt);

	/**
	 * 根据id删除
	 * @param id
	 */
	int deleteByID(@Param("id")int id);

	/**
	 * 新增数据
	 * @param mpqt
	 */
	void insertPhyQuantity(@Param("mpqt")MinePhyQuantityTable mpqt);

	/**
	 * 根据id查询
	 * @param id
	 * @return
	 */
	ShowMinePhyQuantity selectByID(@Param("id")int id);
}