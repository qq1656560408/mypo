package com.mz.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.mz.entity.ForestPhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.service.IForestPhyQuantityTableService;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowForestPhyQuantity;
import com.mz.web.base.BaseControl;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 
 * @since 2018-04-21
 */
@Controller
@RequestMapping("/forestPhyQuantityTable")
public class ForestPhyQuantityTableController extends BaseControl{
	
	@Autowired
	IForestPhyQuantityTableService forestPhyQuantityTableService;

	/**
	 * excel导入
	 * 
	 * @param excelFile
	 * @return
	 */
	@RequestMapping("excelImprot")
	@ResponseBody
	public Object excelImprot(MultipartFile excelFile) {
		return forestPhyQuantityTableService.insertExcelImport(excelFile);
	}

	/**
	 * 查询数据
	 * 
	 * @param page
	 * @param limit
	 * @return
	 */
	@RequestMapping("selectPhyQuantity")
	@ResponseBody
	public Object selectPhyQuantity(Integer page, Integer limit) {
		if (page == null) {
			page = 1;
		}
		if (limit == null) {
			limit = 10;
		}
		int begin = (page - 1) * limit;

		int count = forestPhyQuantityTableService.selectCount(null);
		List<ShowForestPhyQuantity> list = forestPhyQuantityTableService.selectPhyQuantityLimit(begin, limit);
		return new LayuiResponseData(count, list);
	}

	/**
	 * 绑定新增页面下拉框
	 * 
	 * @return
	 */
	@RequestMapping("bingInsertBaseData")
	public ModelAndView insertBaseData() {
		return loadBase("DataManage/ForestManage/shiWuLiang/insertForest");
	}

	/**
	 * 绑定修改页面下拉框
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("bingUpdateBaseData")
	public ModelAndView updateBaseData(int id) {
		ShowForestPhyQuantity spq = forestPhyQuantityTableService.selectByID(id);
		ModelAndView modelAndView = loadBase("DataManage/ForestManage/shiWuLiang/updateForest");
		modelAndView.addObject("spq", spq);
		return modelAndView;
	}

	/**
	 * 新增实物量
	 * 
	 * @param year
	 * @param water
	 * @param forest
	 * @return
	 */
	@RequestMapping("insertPhyQuantity")
	@ResponseBody
	public Object insertPhyQuantity(Integer year, WaterTypeandFeaturesTable water, ForestPhyQuantityTable forest) {
		try {
			int yearID = initBaseData.getValueKey("year").get(year);
			water.setYearID(yearID);
			boolean b = forestPhyQuantityTableService.insertPhyQuantity(water, forest);
			return "{\"success\":" + b + "}";
		} catch (Exception e) {
			e.printStackTrace();
			return "{\"success\":false}";
		}
	}

	/**
	 * 修改实物量
	 * 
	 * @param year
	 * @param water
	 * @param lang
	 * @return
	 */
	@RequestMapping("updatePhyQuantity")
	@ResponseBody
	public Object updatePhyQuantity(ForestPhyQuantityTable lang) {
		boolean ok = forestPhyQuantityTableService.updatePhyQuantity(lang);
		return "{\"success\":" + ok + "}";
	}

	/**
	 * 删除实物量
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("deletePhyQuantity")
	@ResponseBody
	public Object deletePhyQuantity(int id) {
		try {
			forestPhyQuantityTableService.deleteByID(id);
			return "{\"success\":true}";
		} catch (Exception e) {
			e.printStackTrace();
			return "{\"success\":false}";
		}
	}
}
