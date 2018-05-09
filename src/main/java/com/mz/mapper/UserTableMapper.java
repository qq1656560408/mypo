package com.mz.mapper;

import com.mz.entity.UserTable;
import com.mz.entity.WaterPhyQuantityTable;
import org.apache.ibatis.annotations.Param;
import com.mz.vo.SelectUserTable;
import com.mz.vo.ShowAtmoshpherePhyQuantity;
import com.mz.vo.ShowRemoteSensing;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
public interface UserTableMapper extends BaseMapper<UserTable> {
	/**
	 * 根据用户id查询用户名称
	 * @param userID
	 * @return
	 */
	String selectUserNameBYuserID(@Param("userID")Integer userID);
 
	List<UserTable> selectUserTable(@Param("userName")String userName,@Param("passwork") String passwork);
	List<UserTable> selectUserTablesall();
    int deletebyuserID(@Param("userID") int userID);
	int  insertUser(@Param("y")UserTable y);
	SelectUserTable  selectUpdate(@Param("id")int id);
     int  updateUserimfo(@Param("y")UserTable y);
	
}