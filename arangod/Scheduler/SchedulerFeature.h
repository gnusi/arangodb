////////////////////////////////////////////////////////////////////////////////
/// DISCLAIMER
///
/// Copyright 2014-2016 ArangoDB GmbH, Cologne, Germany
/// Copyright 2004-2014 triAGENS GmbH, Cologne, Germany
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///
/// Copyright holder is ArangoDB GmbH, Cologne, Germany
///
/// @author Dr. Frank Celler
////////////////////////////////////////////////////////////////////////////////

#ifndef ARANGOD_SCHEDULER_SCHEDULER_FEATURE_H
#define ARANGOD_SCHEDULER_SCHEDULER_FEATURE_H 1

#include "ApplicationFeatures/ApplicationFeature.h"

#include "Basics/asio-helper.h"

namespace arangodb {
namespace rest {
class Scheduler;
}

class SchedulerFeature final : public application_features::ApplicationFeature {
 public:
  static rest::Scheduler* SCHEDULER;

 public:
  explicit SchedulerFeature(application_features::ApplicationServer* server);
  ~SchedulerFeature();

 public:
  void collectOptions(std::shared_ptr<options::ProgramOptions>) override final;
  void validateOptions(std::shared_ptr<options::ProgramOptions>) override final;
  void start() override final;
  void stop() override final;
  void unprepare() override final;

 public:
  uint64_t queueSize() const { return _queueSize; }

 private:
  uint64_t _nrServerThreads = 0;
  uint64_t _nrMinimalThreads = 0;
  uint64_t _nrMaximalThreads = 0;
  uint64_t _queueSize = 512;

 public:
  size_t concurrency() const {
    return static_cast<size_t>(_nrServerThreads);
  }
  void buildControlCHandler();
  void buildHangupHandler();

 private:
  void buildScheduler();

 private:
  std::unique_ptr<rest::Scheduler> _scheduler;

//#ifndef WIN32
  std::function<void(const boost::system::error_code&, int)> _signalHandler;
  std::function<void(const boost::system::error_code&, int)> _exitHandler;
  std::shared_ptr<boost::asio::signal_set> _exitSignals;
  
  std::function<void(const boost::system::error_code&, int)> _hangupHandler;
  std::shared_ptr<boost::asio::signal_set> _hangupSignals;
//#endif
};
}

#endif
