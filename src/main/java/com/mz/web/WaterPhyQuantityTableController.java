package com.mz.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import com.mz.entity.WaterPhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.service.IWaterPhyQuantityTableService;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowPhyQuantity;
import com.mz.web.base.BaseControl;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author
 * @since 2018-04-16
 */
@Controller
@RequestMapping("/waterPhyQuantityTable")
public class WaterPhyQuantityTableController extends BaseControl {

	@Autowired
	IWaterPhyQuantityTableService waterPhyQuantityTableService;

	/**
	 * excel导入
	 * 
	 * @param excelFile
	 * @return
	 */
	@RequestMapping("excelImprot")
	@ResponseBody
	public Object excelImprot(MultipartFile excelFile) {
		return waterPhyQuantityTableService.insertExcelImport(excelFile);
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

		int count = waterPhyQuantityTableService.selectCount(null);
		List<ShowPhyQuantity> list = waterPhyQuantityTableService.selectPhyQuantityLimit(begin, limit);
		return new LayuiResponseData(count, list);
	}

	/**
	 * 绑定新增页面下拉框
	 * 
	 * @return
	 */
	@RequestMapping("bingInsertBaseData")
	public ModelAndView insertBaseData() {
		return loadBase("DataManage/WaterManage/shiWuLiang/insertShiWuLiang");
	}

	/**
	 * 绑定修改页面下拉框
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("bingUpdateBaseData")
	public ModelAndView updateBaseData(int id) {
		ShowPhyQuantity spq = waterPhyQuantityTableService.selectByID(id);
		ModelAndView modelAndView = loadBase("DataManage/WaterManage/shiWuLiang/updateShiWuLiang");
		modelAndView.addObject("spq", spq);
		return modelAndView;
	}

	/**
	 * 新增实物量
	 * 
	 * @param year
	 * @param water
	 * @param wpt
	 * @return
	 */
	@RequestMapping("insertPhyQuantity")
	@ResponseBody
	public Object insertPhyQuantity(Integer year, WaterTypeandFeaturesTable water, WaterPhyQuantityTable wpt) {
		try {
			int yearID = initBaseData.getValueKey("year").get(year);
			water.setYearID(yearID);
			waterPhyQuantityTableService.insertPhyQuantity(water, wpt);
			return "{\"success\":true}";
		} catch (Exception e) {
			return "{\"success\":false}";
		}
	}

	/**
	 * 修改实物量
	 * 
	 * @param year
	 * @param water
	 * @param wpt
	 * @return
	 */
	@RequestMapping("updatePhyQuantity")
	@ResponseBody
	public Object updatePhyQuantity(WaterPhyQuantityTable wpt) {
		boolean ok = waterPhyQuantityTableService.updatePhyQuantity(wpt);
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
			waterPhyQuantityTableService.deleteByID(id);
			return "{\"success\":true}";
		} catch (Exception e) {
			return "{\"success\":false}";
		}
	}

}
