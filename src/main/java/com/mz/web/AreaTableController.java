package com.mz.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mz.entity.AreaTable;
import com.mz.service.IAreaTableService;
import com.mz.web.base.BaseControl;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
@Controller
@RequestMapping("/areaTable")
public class AreaTableController extends BaseControl  {
	@Autowired
	private IAreaTableService AreaTableService;
	
	@RequestMapping("findArea")
	@ResponseBody
	public List<AreaTable> findArea() {
		List<AreaTable> area_list=AreaTableService.selectList(null);
		return area_list;
	}
	
	@RequestMapping("findAreaMessage")
	@ResponseBody
	public List<AreaTable> findAreaMessage(String areaMC){
		int areaID=0;
		//boolean b3=(areaMC==="");
		if(!"".equals(areaMC)&&areaMC!=null){
			areaID=initBaseData.getValueKey("area").get(areaMC);
		}else{
			
		}
		List<AreaTable> areaTables=AreaTableService.selectAreaMessages(areaID);
		return areaTables;
	}	
}
