package com.mz.web;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import com.mz.entity.MinePriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.service.IMinePriceTableService;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowMinePrice;
import com.mz.web.base.BaseControl;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author
 * @since 2018-04-19
 */
@Controller
@RequestMapping("/minePriceTable")
public class MinePriceTableController extends BaseControl {

	@Autowired
	IMinePriceTableService minePriceTableService;

	/**
	 * 矿产价格excel导入
	 * @param excelFile
	 * @return
	 */
	@RequestMapping("excelImprot")
	@ResponseBody
	public Object excelImprot(MultipartFile excelFile) {
		return minePriceTableService.insertExcelImport(excelFile);
	}

	/**
	 * 矿产价格查询
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
		int count = minePriceTableService.selectCount(null);
		List<ShowMinePrice> list = minePriceTableService.selectPriceTableLimit(begin, limit);

		return new LayuiResponseData(count, list);
	}

	/**
	 * 矿产价格新增绑定
	 * @return
	 */
	@RequestMapping("bingInsertBaseData")
	public ModelAndView insertBaseData() {
		return loadBase("DataManage/mineManage/jiaGe/insertMinePrice");
	}

	/**
	 * 矿产价格修改绑定
	 * @param id
	 * @return
	 */
	@RequestMapping("bingUpdateBaseData")
	public ModelAndView updateBaseData(int id) {
		ShowMinePrice swp = minePriceTableService.selectByID(id);
		ModelAndView modelAndView = loadBase("DataManage/mineManage/jiaGe/updateMinePrice");
		modelAndView.addObject("swp", swp);
		return modelAndView;
	}

	/**
	 * 矿产价格新增
	 * @param year
	 * @param water
	 * @param mpt
	 * @return
	 */
	@RequestMapping("insertPrice")
	@ResponseBody
	public Object insertPrice(Integer year, WaterTypeandFeaturesTable water,MinePriceTable mpt) {
		int yearID = initBaseData.getValueKey("year").get(year);
		water.setYearID(yearID);
		int i = minePriceTableService.insertPriceTable(water,mpt);
		return isSuccess(i);
	}

	/**
	 * 矿产价格修改
	 * @param mpt
	 * @return
	 */
	@RequestMapping("updatePrice")
	@ResponseBody
	public Object updatePrice(MinePriceTable mpt) {
		try {
			minePriceTableService.updatePrice(mpt);
			return "{\"success\":true}";
		} catch (Exception e) {
			return "{\"success\":false}";
		}
	}

	/**
	 * 矿产价格删除
	 * @param id
	 * @return
	 */
	@RequestMapping("deletePrice")
	@ResponseBody
	public Object deletePrice(int id) {
		try {
			minePriceTableService.deleteByID(id);
			return "{\"success\":true}";
		} catch (Exception e) {
			return "{\"success\":false}";
		}
	}

}
