from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from env import get_target_areas

SEARCH_PAGE_URL = 'https://jhomes.to-kousya.or.jp/search/jkknet/service/akiyaJyoukenStartInit'
TARGET_AREAS = get_target_areas()


# ブラウザを起動
driver = webdriver.Chrome()
# 検索ページにアクセス
driver.get(SEARCH_PAGE_URL)
# リダイレクトされるまで待機
try:
  expected = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.NAME, 'akiSearch'))
  )
finally:
  print('リダイレクト完了')
  
# # 対象地域のチェックボックスをオンにする
# for area in TARGET_AREAS:
#     # 1. 地域を選択
#     area_select = driver.find_element_by_id('jyusyoKbn')
#     area_select.send_keys(area)

#     # 3. 検索ボタンをクリック
#     search_button = driver.find_element_by_id('search')
#     search_button.click()

#     # 4. 検索結果を取得
#     # ここに検索結果を取得する処理を書く