package com.mz.web;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import com.mz.entity.WaterPriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.service.IWaterPriceTableService;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowWaterPrice;
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
@RequestMapping("/waterPriceTable")
public class WaterPriceTableController extends BaseControl {

	@Autowired
	IWaterPriceTableService waterPriceTableService;

	/**
	 * excel导入
	 * @param excelFile
	 * @return
	 */
	@RequestMapping("excelImprot")
	@ResponseBody
	public Object excelImprot(MultipartFile excelFile) {
		return waterPriceTableService.insertExcelImport(excelFile);
	}

	/**
	 * 水价格查询
	 * @param page
	 * @param limit
	 * @return
	 */
	@RequestMapping("selectPriceTable")
	@ResponseBody
	public Object selectPriceTable(Integer page, Integer limit) {
		if (page == null) {
			page = 1;
		}
		if (limit == null) {
			limit = 10;
		}
		int begin = (page - 1) * limit;
		int count = waterPriceTableService.selectCount(null);
		List<ShowWaterPrice> list = waterPriceTableService.selectPriceTableLimit(begin, limit);
		return new LayuiResponseData(count, list);
	}

	/**
	 * 绑定修改
	 * @return
	 */
	@RequestMapping("bingInsertBaseData")
	public ModelAndView insertBaseData() {
		return loadBase("DataManage/WaterManage/jiaGe/insertPrice");
	}

	/**
	 * 绑定修改
	 * @param id
	 * @return
	 */
	@RequestMapping("bingUpdateBaseData")
	public ModelAndView updateBaseData(int id) {
		ShowWaterPrice swp = waterPriceTableService.selectByID(id);
		ModelAndView modelAndView = loadBase("DataManage/WaterManage/jiaGe/updatePrice");
		modelAndView.addObject("swp", swp);
		return modelAndView;
	}

	/**
	 * 水价格新增
	 * @param year
	 * @param water
	 * @param wpt
	 * @return
	 */
	@RequestMapping("insertPrice")
	@ResponseBody
	public Object insertPrice(Integer year, WaterTypeandFeaturesTable water, WaterPriceTable wpt) {
		try {
			int yearID = initBaseData.getValueKey("year").get(year);
			water.setYearID(yearID);
			waterPriceTableService.insertWaterPriceTable(water, wpt);
			return "{\"success\":true}";
		} catch (Exception e) {
			return "{\"success\":false}";
		}
	}

	/**
	 * 水价格修改
	 * @param wpt
	 * @return
	 */
	@RequestMapping("updatePrice")
	@ResponseBody
	public Object updatePrice(WaterPriceTable wpt) {
		Boolean b = waterPriceTableService.updatePrice(wpt);
		return "{\"success\":" + b + "}";
	}

	/**
	 * 水价格删除
	 * @param id
	 * @return
	 */
	@RequestMapping("deletePrice")
	@ResponseBody
	public Object deletePrice(int id) {
		Boolean b = waterPriceTableService.deleteByID(id);
		return "{\"success\":" + b + "}";
	}

}
