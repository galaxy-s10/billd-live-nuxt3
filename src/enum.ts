export enum LiveLineEnum {
  rtc = 'rtc',
  hls = 'hls',
  flv = 'flv',
}

/** 直播间类型 */
export enum LiveRoomTypeEnum {
  /** 系统推流 */
  system,
  /** 主播使用srs推流 */
  srs,
  /** 主播使用obs/ffmpeg推流 */
  obs,
  /** 主播使用webrtc推流，直播 */
  wertc_live,
  /** 主播使用webrtc推流，会议，实现一 */
  wertc_meeting_one,
  /** 主播使用webrtc推流，会议，实现二 */
  wertc_meeting_two,
  /** 主播使用msr推流 */
  msr,
  /** 主播打pk */
  pk,
  /** 主播使用腾讯云css推流 */
  tencent_css,
  /** 主播使用腾讯云css推流打pk */
  tencent_css_pk,
  /** 转推b站 */
  forward_bilibili,
  /** 转推斗鱼 */
  forward_huya,
  /** 转推所有 */
  forward_all,
}

export enum FrontendKeyEnum {
  'allow_qq_login' = 'allow_qq_login',
  'allow_github_login' = 'allow_github_login',
  'allow_email_login' = 'allow_email_login',
  'allow_comment' = 'allow_comment',
  'allow_link' = 'allow_link',
  'allow_shutdown_modal' = 'allow_shutdown_modal',
  'shutdown_modal_content' = 'shutdown_modal_content',
  'allow_home_modal' = 'allow_home_modal',
  'home_modal_content' = 'home_modal_content',
  'about_me' = 'about_me',
}

export enum FormTypeEnum {
  'input' = 'input',
  'password' = 'password',
  'number' = 'number',
  'select' = 'select',
  'radio' = 'radio',
  'checkbox' = 'checkbox',
  'markdown' = 'markdown',
  'switch' = 'switch',
  'upload' = 'upload',
  'treeSelect' = 'treeSelect',
  'datePicker' = 'datePicker',
}
